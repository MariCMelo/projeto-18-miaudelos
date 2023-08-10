import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { createUserDB, getUser } from "../repositories/auth.repository.js";

export async function signup(req, res) {
  const { name, cpf, phone, email, password } = req.body;

  try {
    const user = await getUser(email);
console.log("aqui")
    if (user.rowCount !== 0)
      return res.status(409).send({ message: "E-mail já foi cadastrado!" });

    const hash = bcrypt.hashSync(password, 10);
    await createUserDB(name, cpf, phone, email, hash);

    console.log(bcrypt.hashSync(password, 10))

    res.status(201).json({ message: "Usuário criado com sucesso!" });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export function signin(req, res) {
  cp;
  try {
  } catch (err) {}
}
