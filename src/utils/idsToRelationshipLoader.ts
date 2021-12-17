import {
  EntityTarget,
  getConnection,
  getRepository,
  Repository,
} from 'typeorm';
import DataLoader from 'dataloader';

export const createIdsToRelationshipsLoader = <I, O>(
  entityTarget: EntityTarget<I>,
  relations: string | null = null
) =>
  new DataLoader<number, O>(async (ids: number[]) => {
    const repository: Repository<I> = getRepository<I>(entityTarget);
    const entities = await repository.findByIds(ids, {
      relations: relations ? [relations] : [],
    });
    const idToRelationships: Record<number, O> = {};
    entities.forEach((e) => {
      idToRelationships[e['id']] = e[relations];
    });

    const sorted = ids.map((id) => idToRelationships[id]);
    return sorted;
  });
