import { getCatByUserId } from "../repositories/owner.repository.js";

export async function openMyProfile(req, res) {
  const  userId  = req.params.id;

  try {
    const cats =  await getCatByUserId(userId);
    console.log(cats)

    if (cats.rows.length > 0) {
      res.status(200).json( cats.rows );
    } else {
      res
        .status(404)
        .json({ message: "Você ainda não adicionou nenhum Miaudelo." });
    }
  } catch (err) {
    res.status(500).json({ message: "Erro ao abrir o perfil do usuário." });
  }
}
