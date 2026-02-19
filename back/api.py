from fastapi import FastAPI
from pydantic import BaseModel, EmailStr
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   
    allow_methods=["*"],    
    allow_headers=["*"],   
)

class contacto(BaseModel) :
    nombre : str
    email : EmailStr 
    mensaje : str 

@app.post("/enviar-correo") 
async def guardar(datos : contacto) : 
    fecha = datetime.now().strftime("%Y-%m-%d %H:%M")
    linea = f"[{fecha}] {datos.nombre} {datos.email}: {datos.mensaje}\n"
    return {"status": "success", "message": "Datos guardados"}

#    with open("base_de_datos.txt", "a", encoding="utf-8") as f:
#        f.write(linea)
#    return {"status": "success", "message": "Datos guardados"}