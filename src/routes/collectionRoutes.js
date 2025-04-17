import express from "express";
import CollectionController from "../controllers/collectionController.js";
import collectionController from "../controllers/collectionController.js";

const collectionRouter = express.Router();

// Rotas de Personagens
// GET /personagens - Listar todos os Personagens
collectionRouter.get("/", CollectionController.getAllCollections);

// GET /personagens/:id - Obter um Personagem pelo ID
//personagensRouter.get("/:id", PersonagemController.getPersonagemById);

// POST /personagens - Criar um novo Personagem
collectionRouter.post("/", collectionController.createCollection);

// PUT /personagens/:id - Atualizar um Personagem
//personagensRouter.put("/:id", PersonagemController.updatePersonagem);

// DELETE /personagens/:id - Remover um Personagem
//personagensRouter.delete("/:id", PersonagemController.deletePersonagem);

export default collectionRouter;