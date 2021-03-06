/* eslint-disable @typescript-eslint/no-unused-vars */
/*** AUTOGENERATED FILE: you can only modify parts of the file within <keep-*> tags ***/
import { Field, ID, ObjectType } from 'type-graphql';
import { Column, JoinColumn, Entity, OneToOne, ManyToOne, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { User } from '../../user/models/User';
import { HoleInOne } from '../../hole-in-one/models/HoleInOne';

import * as auth from '../../authorization/auth-checkers';
import { HoleInOnePaymentObligationCreateInput } from '../inputs/HoleInOnePaymentObligationCreateInput';
import { HoleInOnePaymentObligationEditInput } from '../inputs/HoleInOnePaymentObligationEditInput';
import { HoleInOnePaymentObligationNestedInput } from '../inputs/HoleInOnePaymentObligationNestedInput';
import { IRequestContext } from '../../shared/IRequestContext';
import { IAuthorizable } from '../../authorization/IAuthorizable';
import { EntityId, EntityIdScalar } from '../../shared/EntityId';
import { HoleInOnePaymentObligationAuth } from '../auth/HoleInOnePaymentObligationAuth';
import { getInputOperationType } from '../../shared/get-input-operation-type';
import { noChange } from '../../shared/no-change';
import { asPromise } from '../../shared/as-promise';

import { updateUserWithPaymentObligationRelation,updateHoleInOneRelation } from './update-operations/holeInOnePaymentObligation-update-operations';

// <keep-imports>
// </keep-imports>

// <keep-decorators>
// </keep-decorators>
@Entity()
@ObjectType()
export class HoleInOnePaymentObligation implements IAuthorizable {
  @Field(() => EntityIdScalar)
  @PrimaryGeneratedColumn()
  id: EntityId;

  public authorizationChecker = new HoleInOnePaymentObligationAuth(this);

  @Field(() => Boolean, )
  @Column({
    // <custom-column-args>
    // </custom-column-args>
  })
  public didPay: boolean;

  @Field(() => Number, )
  @Column({
    // <custom-column-args>
    // </custom-column-args>
  })
  public amountToPay: number;

  @ManyToOne(() => User, (user) => user.paymentObligations , {"nullable":false,"onDelete":"CASCADE"})
  @Field(() => User , {"nullable":false})
  public userWithPaymentObligation: Promise<User>;

  @ManyToOne(() => HoleInOne, (holeInOne) => holeInOne.paymentObligations , {"nullable":false,"onDelete":"CASCADE"})
  @Field(() => HoleInOne , {"nullable":false})
  public holeInOne: Promise<HoleInOne>;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  public async update(input: HoleInOnePaymentObligationCreateInput | HoleInOnePaymentObligationEditInput | HoleInOnePaymentObligationNestedInput, context: IRequestContext) {
    const { userWithPaymentObligation, holeInOne, ...data } = input;
    if (noChange(input)) {
      return this;
    }
    if (getInputOperationType(this, input) === 'update') {
      await auth.assertCanUpdate(this, context);
    }
    Object.assign(this, data);

    await updateUserWithPaymentObligationRelation(this, userWithPaymentObligation, context);
    await updateHoleInOneRelation(this, holeInOne, context);

    context.modelsToSave.push(this);

    // <keep-update-code>
    // </keep-update-code>
    await auth.assertCanPersist(this, context);

    return this;
  }

  // <keep-methods>
  // </keep-methods>
}
