import NodeCache from 'node-cache';
import { CACHE_TTL } from '../config/env';

const cache = new NodeCache({ stdTTL: Number(CACHE_TTL) });

export default cache;
