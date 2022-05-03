import { Router } from 'express';
import adapterRoute from '@external/http/express-route-adapter';
import Controller from '@adapters/controllers/port/controller';
import controllerFactory, {
  ContainerVersion,
} from '@external/dependency-injection/factory';

export default (router: Router): void => {
  router.post('/v1/national-registration', [
    adapterRoute(
      controllerFactory<Controller>(
        'CreateNationalRegistrationController',
        ContainerVersion.V1,
      ),
    ),
  ]);
  router.put('/v1/national-registration/:id', [
    adapterRoute(
      controllerFactory<Controller>(
        'UpdateNationalRegistrationController',
        ContainerVersion.V1,
      ),
    ),
  ]);
  router.get('/v1/national-registration/:id', [
    adapterRoute(
      controllerFactory<Controller>(
        'GetNationalRegistrationByPathController',
        ContainerVersion.V1,
      ),
    ),
  ]);
  router.get('/v1/national-registration', [
    adapterRoute(
      controllerFactory<Controller>(
        'GetNationalRegistrationByQueryController',
        ContainerVersion.V1,
      ),
    ),
  ]);
  router.delete('/v1/national-registration/:id', [
    adapterRoute(
      controllerFactory<Controller>(
        'DeleteNationalRegistrationByPathController',
        ContainerVersion.V1,
      ),
    ),
  ]);
};
