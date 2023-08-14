import { getUserId } from "../repositories/auth.repository.js";
import {
  addCat,
  getCats,
  getCatById,
} from "../repositories/cats.repository.js";

export async function listCats(req, res) {
  try {
    const cats = await getCats();
    res.status(200).json(cats.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function addCatIntoGallery(req, res) {
  const { name, age, color, breed, photo, status } = req.body;
  const { userId } = res.locals;

  try {
    if (
      !name ||
      !name.trim() ||
      !age ||
      !color ||
      !breed ||
      !photo ||
      status === undefined ||
      !userId
    ) {
      res.status(400).send("Campos inválidos.");
    }

    await addCat(name, age, color, breed, photo, status, userId);
    console.log("entrxxx");
    res.status(201).json({ message: "Gato adicionado com sucesso!" });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function openProfile(req, res) {
  const { id } = req.params;

  try {
    const cat = await getCatById(id);
    // console.log(cat)
    if (cat.rowCount !== 0) {
      const owner = await getUserId(cat.rows[0].userId);

      if (owner.rowCount !== 0) {
        const profileData = {
          cat: {
            id: cat.rows[0].id,
            name: cat.rows[0].name,
            age: cat.rows[0].age,
            breed: cat.rows[0].breed,
            color: cat.rows[0].color,
            photo: cat.rows[0].photo,
          },
          owner: {
            name: owner.rows[0].name,
            phone: owner.rows[0].phone,
            email: owner.rows[0].email,
          },
        };
        res.status(200).json(profileData);
      } else {
        res.status(404).json({ message: "Owner not found." });
      }
    } else {
      res.status(404).json({ message: "Cat not found." });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}
