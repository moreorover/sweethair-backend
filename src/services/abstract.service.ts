import { Repository, EntityTarget, getRepository } from 'typeorm';

export class AbstractService<T> {
    readonly repository: Repository<T>;

    constructor(repo: EntityTarget<T>) {
        this.repository = getRepository<T>(repo);
    }

    public async all(relations = []): Promise<T[]> {
        return await this.repository.find({ relations });
    }

    public async paginate(page = 1, relations = [], where = {}) {
        const take = 15;

        const [data, total] = await this.repository.findAndCount({
            take,
            skip: (page - 1) * take,
            relations,
            where
        });

        return {
            data: data,
            meta: { total, page, last_page: Math.ceil(total / take) }
        };
    }

    public async create(data): Promise<any> {
        return this.repository.save(data);
    }

    public async findOne(condition, relations = []): Promise<any> {
        return this.repository.findOne(condition, { relations });
    }

    public async update(id: string | number, data): Promise<any> {
        await this.repository.save(data);
        return this.findOne({ id });
    }

    public async delete(id: string | number): Promise<any> {
        return this.repository.delete(id);
    }
}
