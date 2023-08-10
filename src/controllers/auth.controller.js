import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { createSession, createUserDB, getUser } from "../repositories/auth.repository.js";

export async function signup(req, res) {
  const { name, cpf, phone, email, password } = req.body;

  try {
    const user = await getUser(email);
    console.log("aqui");
    if (user.rowCount !== 0)
      return res.status(409).send({ message: "E-mail já foi cadastrado!" });

    const hash = bcrypt.hashSync(password, 10);
    await createUserDB(name, cpf, phone, email, hash);

    console.log(bcrypt.hashSync(password, 10));

    res.status(201).json({ message: "Usuário criado com sucesso!" });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function signin(req, res) {
  const { email, password} = req.body;
  try {
    const user = await getUser(email);
    if (user.rowCount === 0)
      return res.status(401).send({ message: "E-mail não cadastrado!" });

    const isPasswordCorrect = bcrypt.compareSync(
      password,
      user.rows[0].password
    );

    if (!isPasswordCorrect) {
      return res.status(401).send({ message: "Senha incorreta!" });
    }
    const token = uuid();

    await createSession(user.rows[0].id, token);
    res.send({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
}
