import { injectable, inject } from "inversify";
import { DataSource, DeepPartial, Repository } from "typeorm";
import { UserEntity } from "@/models/user.entity";
import { TYPES } from "@/config/container/types";

@injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(@inject(TYPES.DataSource) dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async createUser(user: DeepPartial<UserEntity>): Promise<UserEntity> {
    return this.save(user);
  }

  async findUserByExternalIds(
    externalIds: Record<string, string[]>
  ): Promise<UserEntity | null> {
    const query = this.createQueryBuilder("user").where(
      "user.externalIds @> :ids::jsonb",
      {
        ids: JSON.stringify(externalIds),
      }
    );

    return query.getOne();
  }

  async updateUser(
    id: string,
    user: DeepPartial<UserEntity>
  ): Promise<UserEntity> {
    return this.save({ ...user, id });
  }
}
