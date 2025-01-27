import mongoose, { model, Schema } from "mongoose";
import { conexion } from "../helpers/conexion.js";

conexion();

const articuloSchema = new Schema(
  {
    titulo: String,
    cuerpo: String,
    usuario: String,
  },
  {
    versionKey: false,
  }
);

const Articulo = model("Articulo", articuloSchema);

export class ArticuloModel {
  static async getAll() {
    try {
      return Articulo.find();
    } catch (e) {
      console.log(e);
    }
  }

  static async getOneByID(id) {
    try {
      return await Articulo.findById(id);
    } catch (e) {
      console.log(e);
    }
  }

  static async delete(id) {
    try {
      return Articulo.deleteOne({ _id: id });
    } catch (e) {
      console.log(e);
    }
  }

  static async create(articulo) {
    const articuloGuardar = new Articulo(articulo);
    try {
      await articuloGuardar.save();
      return articuloGuardar;
    } catch (e) {
      console.log(e);
    }
  }

  static async update(id, validacion) {
    try {
      return await Articulo.findOneAndUpdate({ _id: id }, { ...validacion }, { new: true });
    } catch (e) {
      console.log(e);
    }
  }
}