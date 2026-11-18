# ============================================================
# REVISAR LABORATORIOS
# Lo ejecuta GitHub antes de publicar el sitio.
# También puedes ejecutarlo en tu computador desde la carpeta
# del proyecto:
#     python .github/scripts/revisar_labs.py
#
# Revisa los errores más comunes al agregar un laboratorio:
# - un archivo JSON mal escrito (una coma de más o de menos);
# - una carpeta del catálogo que no existe;
# - un archivo de "archivos" que no está en inicio/
#   (o en la carpeta de cada proyecto, si el lab tiene varios);
# - datos que faltan o ids repetidos.
# ============================================================

import json
import re
import sys
from pathlib import Path

errores = []


def leer_json(ruta):
    """Lee un archivo JSON. Si está mal escrito, anota el error."""
    try:
        with open(ruta, encoding="utf-8") as archivo:
            return json.load(archivo)
    except FileNotFoundError:
        errores.append(f"{ruta}: el archivo no existe.")
    except json.JSONDecodeError as error:
        errores.append(f"{ruta}, línea {error.lineno}: JSON mal escrito ({error.msg}).")
    return None


def revisar_campos(ruta, datos, campos):
    """Anota los campos que faltan."""
    for campo in campos:
        if campo not in datos:
            errores.append(f'{ruta}: falta el campo "{campo}".')


def revisar_proyectos(ruta, proyectos):
    """Revisa el bloque "proyectos" y devuelve las carpetas de inicio."""
    opciones = proyectos.get("opciones", []) if isinstance(proyectos, dict) else []
    if not opciones:
        errores.append(f'{ruta}: "proyectos" debe tener una lista "opciones" con al menos un proyecto.')
        return []
    carpetas = []
    for opcion in opciones:
        revisar_campos(ruta, opcion, ["id", "titulo"])
        ident = str(opcion.get("id", ""))
        # El id es también el nombre de la carpeta: sin espacios ni tildes.
        if not re.fullmatch(r"[a-z0-9_-]+", ident):
            errores.append(f'{ruta}: el id de proyecto "{ident}" solo puede tener '
                           "letras minúsculas sin tildes, números, - y _.")
            continue
        carpetas.append(f"inicio/{ident}")
    ids = [str(opcion.get("id")) for opcion in opciones]
    repetidos = {i for i in ids if ids.count(i) > 1}
    if repetidos:
        errores.append(f"{ruta}: hay proyectos con el mismo id: {', '.join(sorted(repetidos))}.")
    return carpetas


def revisar_laboratorio(carpeta):
    # as_posix() escribe la ruta con / también en Windows.
    ruta = (carpeta / "lab.json").as_posix()
    lab = leer_json(ruta)
    if lab is None:
        return

    revisar_campos(ruta, lab, ["id", "titulo", "objetivo", "duracion", "nivel", "archivos", "tareas"])

    archivos = lab.get("archivos", [])
    if not archivos:
        errores.append(f'{ruta}: "archivos" no puede estar vacío.')

    # Sin "proyectos", los archivos están en inicio/.
    # Con "proyectos", cada proyecto tiene su carpeta: inicio/<id del proyecto>/.
    carpetas_inicio = ["inicio"]
    if "proyectos" in lab:
        carpetas_inicio = revisar_proyectos(ruta, lab["proyectos"])
    for carpeta_inicio in carpetas_inicio:
        for archivo in archivos:
            nombre = archivo.get("nombre", "")
            if not (carpeta / carpeta_inicio / nombre).is_file():
                errores.append(f"{ruta}: no existe el archivo {carpeta_inicio}/{nombre}.")
    principales = [a for a in archivos if a.get("principal")]
    if len(principales) != 1:
        errores.append(f'{ruta}: debe haber exactamente un archivo con "principal": true.')

    ids = [tarea.get("id") for tarea in lab.get("tareas", [])]
    for tarea in lab.get("tareas", []):
        revisar_campos(ruta, tarea, ["id", "texto"])
    repetidos = {i for i in ids if ids.count(i) > 1}
    if repetidos:
        errores.append(f"{ruta}: hay tareas con el mismo id: {', '.join(sorted(map(str, repetidos)))}.")


def main():
    catalogo = leer_json("labs/labs.json")
    if catalogo is not None:
        revisar_campos("labs/labs.json", catalogo, ["curso", "laboratorios"])
        for entrada in catalogo.get("laboratorios", []):
            revisar_campos("labs/labs.json", entrada,
                           ["id", "titulo", "descripcion", "duracion", "nivel", "carpeta"])
            carpeta = Path("labs") / entrada.get("carpeta", "")
            if not carpeta.is_dir():
                errores.append(f'labs/labs.json: no existe la carpeta {carpeta.as_posix()} de "{entrada.get("titulo")}".')
            else:
                revisar_laboratorio(carpeta)

    # La plantilla no está en el catálogo, pero también debe estar bien.
    revisar_laboratorio(Path("labs/_plantilla"))

    if errores:
        print("Se encontraron problemas:\n")
        for error in errores:
            print(" -", error)
        sys.exit(1)
    print("Todo bien: los laboratorios están listos para publicar.")


main()
