import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('factor', 'FactorsController.index')
}).middleware('auth')
