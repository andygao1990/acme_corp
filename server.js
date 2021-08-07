const { conn, syncAndSeed, models: { Department, Employee }} = require ('./db')
const express = require ('express')
const app = express()

app.get('/api/departments', async (req, res, next) => {
    try {
        res.send(await Department.findAll({
            include: [
                {
                    model: Employee,
                    as: 'manager'
                }
            ]
        }))
    }
    catch (err){
        next(err)
    }
})

app.get('/api/employees', async (req, res, next) => {
    try {
        res.send(await Employee.findAll({
            include: [
                {
                    model: Employee,
                    as: 'supervisor'
                },
                {
                    model: Employee
                },
                {
                    model: Department
                }
            ]
        }))
    }
    catch (err){
        next(err)
    }
})

const init = async () => {
    try {
        await conn.authenticate()
        await syncAndSeed()
        const port = process.env.PORT || 3000
        app.listen(port, () => console.log(`listening on port ${port}`))
    }
    catch (err) {
        console.log(err)
    }
}
init()