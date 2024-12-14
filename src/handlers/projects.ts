import { Request, Response } from "express-serve-static-core";

export async function getProjects(request: Request, response: Response){
    response.status(200).send('hi')
}

export async function getProjectById(request: Request, response: Response){
    
}

export async function createProject(request: Request, response: Response){
    
}

export async function updateProjectById(request: Request, response: Response){
    
}

export async function deleteProjectById(request: Request, response: Response){
    
}