import express from 'express';
import { nanoid } from 'nanoid';
import { client } from '../../mongodb.mjs';

const db = client.db("user");
const col =db.collection("profile");

let router = express.Router();

router.post('/profile', async (req, res, next) => {
    const { username, bio, phone, passion, hobby } = req.body;

    if (!username || !bio || !phone || !passion || !hobby) {
        res.status(400).send('Required parameter is missing. Please fill all input fields properly.');
        return;
    }

    const newProfile = {
        id: nanoid(),
        username,
        bio,
        phone,
        passion,
        hobby,
    };

    await col.insertOne(newProfile);
    res.send('Profile created successfully.');
});

router.get('/profiles', async (req, res, next) => {
    try {
        const cursor = col.find({}).sort({ timestamp: -1 });
        let results = await cursor.toArray();

        console.log(results);
        res.send(results);
    } catch (error) {
        console.error(error);
    }
});

router.get('/profile/:profileId', async (req, res, next) => {
    const profileId = req.params.profileId;

    try {
        const profile = await col.findOne({ id: profileId });

        if (profile) {
            res.send(profile);
        } else {
            res.status(404).send('Profile not found with id ' + profileId);
        }
    } catch (error) {
        console.error(error);
    }
});

router.delete('/profile/:profileId', async (req, res, next) => {
    const profileId = req.params.profileId;

    try {
        const deleteResponse = await col.deleteOne({ id: profileId });
        if (deleteResponse.deletedCount === 1) {
            res.send(`Profile with id ${profileId} deleted successfully.`);
        } else {
            res.send('Profile not found with the given id.');
        }
    } catch (error) {
        console.error(error);
    }
});

router.put('/profile/:profileId', async (req, res, next) => {
    const profileId = req.params.profileId;
    const { username, bio, phone, passion, hobby } = req.body;

    if (!username || !bio || !phone || !passion || !hobby) {
        res.status(403).send('Required parameters missing. Please provide all profile details.');
        return;
    }

    try {
        const updateResponse = await col.updateOne({ id: profileId }, { $set: { username, bio, phone, passion, hobby } });

        if (updateResponse.matchedCount === 1) {
            res.send(`Profile with id ${profileId} updated successfully.`);
        } else {
            res.send('Profile not found with the given id.');
        }
    } catch (error) {
        console.error(error);
    }
});

export default router;
