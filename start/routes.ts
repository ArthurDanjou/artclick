import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from "@ioc:Adonis/Core/HealthCheck";

Route.get('/ok', async ({ response}) => {
  return response.ok('test');
})

Route.get('/bad', async ({ response}) => {
  return response.badRequest('test');
})

Route.get('/', 'LinksController.getAllLinks') // --> Home
Route.get('/:id', 'LinksController.getLink')
Route.get('/:id/count', 'LinksController.getVisitCount')

Route
  .group(() => {
    Route.post('/login', 'UsersController.login')
    Route.post('/logout', 'UsersController.logout')
  })
  .prefix('auth')

Route
  .group(() => {
    Route.post('/create', 'LinksController.createLink')
    Route.post('/update', 'LinksController.updateLink')
  })
  .prefix('options')
  .middleware('auth')

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy
    ? response.ok(report)
    : response.badRequest(report)
})
