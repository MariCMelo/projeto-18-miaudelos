import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import {
  createSession,
  createUserDB,
  getUserCpf,
  getUserEmail,
} from "../repositories/auth.repository.js";

export async function signup(req, res) {
  const { name, cpf, phone, email, password } = req.body;

  try {
    const userEmail = await getUserEmail(email);
   
    const userCpf = await getUserCpf(cpf); 
    console.log("teste")
    console.log(userEmail.rowCount);
    if (userEmail.rowCount !== 0) {  
      console.log("erro de email")
      return res.status(409).send({ message: "E-mail já foi cadastrado!" }) };
    if (userCpf.rowCount !== 0) {
      console.log("erro de cpf")
      return res.status(409).send({ message: "CPF já foi cadastrado!" }) };

    const hash = bcrypt.hashSync(password, 10);
    await createUserDB(name, cpf, phone, email, hash);

    console.log(bcrypt.hashSync(password, 10));

    res.status(201).json({ message: "Usuário criado com sucesso!" });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function signin(req, res) {
  const { email, password } = req.body;
  try {
    const user = await getUserEmail(email);
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
