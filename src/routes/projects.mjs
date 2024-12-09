import {Router} from 'express'

const router = Router()

router.get('/', (req, res)=> {
    res.send([{ id: 1, name: 'Project Name', description: 'This is a project description', image: 'img/project_1.png' }, { id: 2, name: 'Project Name', description: 'This is a project description', image: 'img/project_3.png' }])
})

export default router;

