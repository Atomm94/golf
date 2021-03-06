/* eslint-disable @typescript-eslint/no-unused-vars */
/*** AUTOGENERATED FILE: you can only modify parts of the file within <keep-*> tags ***/
import { Field, ID, ObjectType } from 'type-graphql';
import { Column, JoinColumn, Entity, OneToOne, ManyToOne, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { Club } from '../../club/models/Club';
import { User } from '../../user/models/User';
import { HoleInOnePaymentObligation } from '../../hole-in-one-payment-obligation/models/HoleInOnePaymentObligation';

import * as auth from '../../authorization/auth-checkers';
import { HoleInOneCreateInput } from '../inputs/HoleInOneCreateInput';
import { HoleInOneEditInput } from '../inputs/HoleInOneEditInput';
import { HoleInOneNestedInput } from '../inputs/HoleInOneNestedInput';
import { IRequestContext } from '../../shared/IRequestContext';
import { IAuthorizable } from '../../authorization/IAuthorizable';
import { EntityId, EntityIdScalar } from '../../shared/EntityId';
import { HoleInOneAuth } from '../auth/HoleInOneAuth';
import { getInputOperationType } from '../../shared/get-input-operation-type';
import { noChange } from '../../shared/no-change';
import { asPromise } from '../../shared/as-promise';

import { updateClubRelation } from './update-operations/holeInOne-update-operations';

// <keep-imports>
import {addPaymentObligationsToHoleInOne} from "../services/add-payment-obligations-to-hole-in-one";
// </keep-imports>

// <keep-decorators>
// </keep-decorators>
@Entity()
@ObjectType()
export class HoleInOne implements IAuthorizable {
  @Field(() => EntityIdScalar)
  @PrimaryGeneratedColumn()
  id: EntityId;

  public authorizationChecker = new HoleInOneAuth(this);

  @Field(() => Date, )
  @Column({
    // <custom-column-args>
    // </custom-column-args>
  })
  public date: Date;

  @Field(() => String, )
  @Column({
    // <custom-column-args>
    // </custom-column-args>
  })
  public courseName: string;

  @Field(() => Number, )
  @Column({
    // <custom-column-args>
    // </custom-column-args>
  })
  public holeNumber: number;

  @Field(() => Number, )
  @Column({
    // <custom-column-args>
    // </custom-column-args>
  })
  public yardage: number;

  @ManyToOne(() => Club, (club) => club.holesInOne , {"nullable":false,"onDelete":"CASCADE"})
  @Field(() => Club , {"nullable":false})
  public club: Promise<Club>;

  @ManyToOne(() => User, (user) => user.holesInOne , {"nullable":false,"onDelete":"CASCADE"})
  @Field(() => User , {"nullable":false})
  public winner: Promise<User>;

  @OneToMany(() => HoleInOnePaymentObligation, (holeInOnePaymentObligation) => holeInOnePaymentObligation.holeInOne)
  @Field(() => [HoleInOnePaymentObligation])
  public paymentObligations: Promise<Array<HoleInOnePaymentObligation>>;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  public async update(input: HoleInOneCreateInput | HoleInOneEditInput | HoleInOneNestedInput, context: IRequestContext) {
    const { club, ...data } = input;
    if (noChange(input)) {
      return this;
    }
    if (getInputOperationType(this, input) === 'update') {
      await auth.assertCanUpdate(this, context);
    }
    Object.assign(this, data);

    if (getInputOperationType(this, input) === 'create') {
      this.winner = asPromise(await this.winner || await context.user)
    }
    await updateClubRelation(this, club, context);

    context.modelsToSave.push(this);

    // <keep-update-code>
    if (getInputOperationType(this, input) === 'create') {
      await addPaymentObligationsToHoleInOne(context, this);
    }
    // </keep-update-code>
    await auth.assertCanPersist(this, context);

    return this;
  }

  // <keep-methods>
  // </keep-methods>
}
