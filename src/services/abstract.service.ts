import { Repository, EntityTarget, getRepository, FindManyOptions, FindConditions, DeleteResult } from 'typeorm';

export class AbstractService<T, C, U> {
    readonly repository: Repository<T>;

    constructor(repo: EntityTarget<T>) {
        this.repository = getRepository<T>(repo);
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

    public async update(id: number, data: U) {
        const toUpdate = await this.findOne(id);
        await this.repository.save({ ...toUpdate, ...data });
        return this.findOne(id);
    }

    public async delete(id: number): Promise<DeleteResult> {
        return this.repository.delete(id);
    }
}
