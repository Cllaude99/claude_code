import type { Project } from '@/types/portfolio';
import { syncspot } from './syncspot';
import { pinoco } from './pinoco';

export const projects: Project[] = [syncspot, pinoco];

export { experience, education } from './experience';
