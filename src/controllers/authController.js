import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import e from "express";
import jwt from "jsonwebtoken"; 

class AuthController {
    // Listar todos os usuários
    async getAllUsers(req, res) {
        try {
            const users = await UserModel.findAll();
            res.json(users);
        } catch (error) {
            console.error("Erro ao listar usuários:", error);
            res.status(500).json({ error: "Erro ao listar usuários" });
        }
    }

    // Registrar um novo usuário
    async register(req, res) {
        try {
            const { name, email, password } = req.body;

            // Validação básica
            if (!name || !email || !password) {
                return res.status(400).json({ error: "Todos os campos são obrigatórios." });
            }
            //verifica se o usuário já existe
            const userExists = await UserModel.findByEmail(email);
            if (userExists) {
                return res.status(400).json({ error: "Esse email ja esta em uso!" });
            }

            // Hashar da senha
            const hashedPassword = await bcrypt.hash(password, 10);
            // Criar objeto do usuário
            const data = {
                name,
                email,
                password: hashedPassword,
            };

            // Criar usuário no banco de dados
            const newUser = await UserModel.create(data);

            return res.status(201).json({
                message: "Usuário criado com sucesso",
                newUser,
            });
        } catch (error) {

        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            // Validação básica
            if (!email || !password) {
                return res.status(400).json({ error: "Todos os campos são obrigatórios." });
            }

            // Verifica se o usuário existe
            const userExists = await UserModel.findByEmail(email);
            if (!userExists) {
                return res.status(400).json({ error: "Credenciais inválidas" });
            }
            // Verifica a senha
            const isPasswordValid = await bcrypt.compare(password, userExists.password);
            if (!isPasswordValid) {
                return res.status(400).json({ error: "Credenciais inválidas" });
            }
            //Gerar token JWT

        const token = jwt.sign (
            { id: userExists.id, 
            name: userExists.name, 
            email: userExists.email,
         },
             process.env.JWT_SECRET, 
             {
                expiresIn: "24h"
             }
        );
            
      return res.status(200).json({
        message: "Login realizado com sucesso",
        token,
        userExists,
      });
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            res.status(500).json({ error: "Erro ao fazer login" });
        }
      }
    }

  
export default new AuthController();