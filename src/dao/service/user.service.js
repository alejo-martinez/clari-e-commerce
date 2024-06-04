import utils from "../../utils.js";
import { userModel } from "../models/user.model.js";

export class UserManager{
    static async create(user){
        try {
            await userModel.create(user);
        } catch (error) {
            return error;
        }
    }

    static async getById(id){
        try {
            return await userModel.findOne({_id: id}).lean();
        } catch (error) {
            return error;
        }
    }

    static async getByField(field, value){
        try {
            return await userModel.findOne({[field]: value}).populate('cart').lean();
        } catch (error) {
            return error;
        }
    }

    static async getWithPassword(field, value){
        try {
            return await userModel.findOne({[field]: value}).select('+password').lean();
        } catch (error) {
            return error;
        }
    }

    static async update(field, value, id){
        try {
            await userModel.updateOne({_id: id}, {$set:{[field]: value}});
        } catch (error) {
            return error;
        }
    }

    static async delete(id){
        try {
            await userModel.deleteOne({_id: id});
        } catch (error) {
            return error;
        }
    }

    static async resetPass(id){
        try {
            await userModel.updateOne({_id: id}, {$set:{'password': ''}});
        } catch (error) {
            return error;
        }
    }

    static async updatePass(pass, id){
        try {
            const passHasheada = utils.createHash(pass);
            await userModel.updateOne({_id: id}, {$set: {'password': passHasheada}});
        } catch (error) {
            return error;
        }
    }
}