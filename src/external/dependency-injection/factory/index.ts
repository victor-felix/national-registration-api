import { container, containerV1 } from '../containers/index';

const containerMap = {
  0: container,
  1: containerV1,
};

export enum ContainerVersion {
  DEFAULT,
  V1,
}

export default <TResult>(injectionToken: string, version: number):
TResult => containerMap[version].resolve<TResult>(injectionToken);
