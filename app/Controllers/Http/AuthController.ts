
import { schema, rules } from "@ioc:Adonis/Core/Validator"

import Hash from '@ioc:Adonis/Core/Hash'

import User from 'App/Models/User'

export default class AuthController {

    async register({ request, response }) {
        try {
            const userData = request.only(['email', 'password'])

            // Se valida los datos de entrada
            const validationSchema = schema.create({
                email: schema.string({}, [
                    rules.email(),
                    rules.unique({ table: 'users', column: 'email' }),
                ]),
                
                password: schema.string({}, [
                    rules.minLength(6)
                ]),
            })

            const messages = {
                'required': 'El campo {{ field }} es obligatorio',
                'email': 'Introduzca un email válido',
                'unique': 'Ya hay un registro con ese {{field}}',
                'minLength': 'El campo {{ field }} debe tener mínimo {{ options.minLength }} caracteres',
            }

            // Se captura la excepción de validación para personalizar la respuesta de error
            try {
                await request.validate({ schema: validationSchema, messages })
            } catch (error) {
                console.log(error)
                return response.status(400).json({ message: error.messages.errors })
            }

            // Se hashea la contraseña
            userData.password = await Hash.make(userData.password)

            await User.create(userData)

            return response.ok("Usuario creado correctamente")
        } catch (error) {
            console.log(error)
            return response.status(400).json({ message: 'Registro de usuario fallido.' })
        }
    }

    async login({ request, auth, response }) {
        const { email, password } = request.all()

        try {
            // Se verifica las credenciales
            const user = await User.findBy('email', email)
            
            //Si existe el usuario y el password conincide se devuelve el token
            if (user && (await Hash.verify(user.password, password))) {
                
                //const token = sign({ email: user.email }, Env.get('APP_KEY'), { expiresIn: '1h' })
                const token = await auth.use('api').generate(user)

                return response.json({ email:user.email, token })
            }


            return response.status(401).json({ message: 'Credenciales inválidas.' })
        } catch (error) {
            console.log(error);
            return response.status(500).json({ message: 'Ocurrió un error inesperado, intente en unos minutos' })
        }
    }
}
