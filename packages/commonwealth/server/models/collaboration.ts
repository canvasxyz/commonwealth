import type * as Sequelize from 'sequelize';
import type { DataTypes } from 'sequelize';
import { Model } from 'sequelize';
import type { ModelStatic, ModelInstance } from './types';
import type { AddressInstance, AddressAttributes } from './address';
import type { ThreadInstance, ThreadAttributes } from './thread';

export type CollaborationAttributes = {
  address_id: number;
  thread_id: number;
  created_at?: Date;
  updated_at?: Date;

  Address: AddressAttributes;
  Thread: ThreadAttributes;
}

export type CollaborationInstance = ModelInstance<CollaborationAttributes> & {
  // no mixins used yet
  getAddress: Sequelize.BelongsToGetAssociationMixin<AddressInstance>;
  setAddress: Sequelize.BelongsToSetAssociationMixin<AddressInstance, AddressInstance['id']>;
  getThread: Sequelize.BelongsToGetAssociationMixin<ThreadInstance>;
  setThread: Sequelize.BelongsToSetAssociationMixin<ThreadInstance, ThreadInstance['id']>;
}

export type CollaborationModelStatic = ModelStatic<CollaborationInstance>;

export default (
  sequelize: Sequelize.Sequelize,
  dataTypes: typeof DataTypes,
) => {
  const Collaboration = <CollaborationModelStatic>sequelize.define(
    'Collaboration', {
      address_id: { type: dataTypes.INTEGER, allowNull: false, primaryKey: true },
      thread_id: { type: dataTypes.INTEGER, allowNull: false, primaryKey: true },
      created_at: { type: dataTypes.DATE, allowNull: false },
      updated_at: { type: dataTypes.DATE, allowNull: false },
    }, {
      tableName: 'Collaborations',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
    }
  );

  Collaboration.associate = (models) => {
    models.Collaboration.belongsTo(models.Address);
    models.Collaboration.belongsTo(models.Thread);
  };

  return Collaboration;
};
