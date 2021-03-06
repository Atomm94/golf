/* eslint-disable @typescript-eslint/no-unused-vars */
/*** AUTOGENERATED FILE: you can only modify parts of the file within <keep-*> tags ***/
import { Field, ID, ObjectType } from 'type-graphql';
import { Column, JoinColumn, Entity, OneToOne, ManyToOne, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { User } from '../../user/models/User';
import { Bet } from '../../bet/models/Bet';

import * as auth from '../../authorization/auth-checkers';
import { BetsGroupCreateInput } from '../inputs/BetsGroupCreateInput';
import { BetsGroupEditInput } from '../inputs/BetsGroupEditInput';
import { BetsGroupNestedInput } from '../inputs/BetsGroupNestedInput';
import { IRequestContext } from '../../shared/IRequestContext';
import { IAuthorizable } from '../../authorization/IAuthorizable';
import { EntityId, EntityIdScalar } from '../../shared/EntityId';
import { BetsGroupAuth } from '../auth/BetsGroupAuth';
import { getInputOperationType } from '../../shared/get-input-operation-type';
import { noChange } from '../../shared/no-change';
import { asPromise } from '../../shared/as-promise';

import { updateUserRelation } from './update-operations/betsGroup-update-operations';

// <keep-imports>
// </keep-imports>

// <keep-decorators>
// </keep-decorators>
@Entity()
@ObjectType()
export class BetsGroup implements IAuthorizable {
  @Field(() => EntityIdScalar)
  @PrimaryGeneratedColumn()
  id: EntityId;

  public authorizationChecker = new BetsGroupAuth(this);

  @Field(() => String, )
  @Column({"type":"varchar",
    // <custom-column-args>
    // </custom-column-args>
  })
  public name: string;

  @ManyToOne(() => User, (user) => user.betsGroups , {"nullable":false,"onDelete":"CASCADE"})
  @Field(() => User , {"nullable":false})
  public user: Promise<User>;

  @OneToMany(() => Bet, (bet) => bet.betsGroup)
  @Field(() => [Bet])
  public bets: Promise<Array<Bet>>;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  public async update(input: BetsGroupCreateInput | BetsGroupEditInput | BetsGroupNestedInput, context: IRequestContext) {
    const { user, ...data } = input;
    if (noChange(input)) {
      return this;
    }
    if (getInputOperationType(this, input) === 'update') {
      await auth.assertCanUpdate(this, context);
    }
    Object.assign(this, data);

    await updateUserRelation(this, user, context);

    context.modelsToSave.push(this);

    // <keep-update-code>
    // </keep-update-code>
    await auth.assertCanPersist(this, context);

    return this;
  }

  // <keep-methods>
  // </keep-methods>
}
