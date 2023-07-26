import express from 'express';
import { nanoid } from 'nanoid';
let router = express.Router();

console.log(nanoid)

let profiles =[



]

router.post('/profile', (req, res, next) => {
    const { username, bio, phone, passion, hobby, img } = req.body;
  
    if (!username || !bio || !phone || !passion || !hobby || !img) {
      res.status(400).send('Required parameter is missing. Please fill all input fields properly.');
      return;
    }
  
    profiles.push({
      id: nanoid(),
      username,
      bio,
      phone,
      passion,
      hobby,
      img,
    });
  
    res.send('Profile created successfully.');
  });
  
//   sare post all post

router.get('/profile/:profileId', (req, res, next) => {
   

    for (let i = 0; i < profiles.length; i++) {
        if (profiles[i].id === Number(req.params.profileId)) {
            res.send(profiles[i]);
            return;
        }
    }
    res.send('profile not found with id ' + req.params.profileId);
})


router.get('/profiles', (req, res, next) => {
    res.send(profiles);
})
router.get('/profile/:profileId', (req, res, next) =>{
    res.send(profiles);
    })

// deletd 
router.delete('/profile/:profileId', (req, res, next) => {
    

    const profileId = req.params.profileId;
    const profileIndex = profiles.findIndex(profile=> profile.id === profileId);

    if (profileIndex !== -1) {
        profiles.splice(profileIndex, 1);
        res.send('profile deleted');
    } else {
        res.status(404).send('profile not found');
    }
});

export default router;


// import express from 'express';
// import { nanoid } from 'nanoid';
// const router = express.Router();

// let profiles = [];

// router.post('/profiles', (req, res, next) => {
//   const { username, bio, phone, passion, hobby, img } = req.body;

//   if (!username || !bio || !phone || !passion || !hobby || !img) {
//     res.status(400).send('Required parameter is missing. Please fill all input fields properly.');
//     return;
//   }

//   const newProfile = {
//     id: nanoid(),
//     username,
//     bio,
//     phone,
//     passion,
//     hobby,
//     img,
//   };

//   profiles.push(newProfile);
//   res.send('Profile created successfully.');
// });

// router.get('/profiles', (req, res, next) => {
//     res.send(profiles);
//   });

// router.get('/profiles/:profileId', (req, res, next) => {
//   const profileId = req.params.profileId;

//   const profile = profiles.find((profile) => profile.id === profileId);
//   if (profile) {
//     res.send(profile);
//   } else {
//     res.status(404).send('Profile not found with id ' + profileId);
//   }
// });

// router.delete('/profiles/:profileId', (req, res, next) => {
//   const profileId = req.params.profileId;
//   const profileIndex = profiles.findIndex((profile) => profile.id === profileId);

//   if (profileIndex !== -1) {
//     profiles.splice(profileIndex, 1);
//     res.send('Profile deleted successfully.');
//   } else {
//     res.status(404).send('Profile not found.');
//   }
// });

// export default router;




















