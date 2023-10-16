import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('survey', 'SurveysController.index')
    Route.get('survey/:id', 'SurveysController.show')
    Route.post('survey', 'SurveysController.store')
    Route.put('survey/:id', 'SurveysController.update')
    Route.delete('survey/:id', 'SurveysController.destroy')
}).middleware('auth')