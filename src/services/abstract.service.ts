import { Repository, EntityTarget, getRepository, FindManyOptions, FindConditions, DeleteResult, DeepPartial } from 'typeorm';

export class AbstractService<T, C, U> {
    readonly repository: Repository<T>;

    constructor(repo: EntityTarget<T>) {
        this.repository = getRepository<T>(repo);
    }

    getQueryBuilder(alias: string) {
        return this.repository.createQueryBuilder(alias);
    }

    public async all(options: FindManyOptions<T> = {}) {
        return await this.repository.find(options);
    }

    public async paginate(page = 1, options: FindManyOptions<T> = {}) {
        const take = 15;

        const [data, total] = await this.repository.findAndCount({
            take,
            skip: (page - 1) * take,
            ...options
        });

        return {
            data: data,
            meta: { total, page, last_page: Math.ceil(total / take) }
        };
    }

    public async create(data: C): Promise<any> {
        return this.repository.save(data);
    }

    public async findOne(conditions: FindConditions<T>, options: FindManyOptions<T> = {}) {
        return this.repository.findOne(conditions, options);
    }

    public async findByIds(ids: number[], options: FindManyOptions<T> = {}) {
        return this.repository.findByIds(ids, options);
    }

    public async update(id: number, data: DeepPartial<T>) {
        return await this.repository.update(id, data);
    }

    public async delete(id: number): Promise<DeleteResult> {
        return this.repository.delete(id);
    }
}
