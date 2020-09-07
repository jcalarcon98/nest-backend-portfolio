import {
  EntitySubscriberInterface,
  InsertEvent,
  EventSubscriber,
} from 'typeorm';

import { User } from '../../modules/user/user.entity';
import { UserUtils } from '../../utils/user.utils';

/**
 * Allows you to define methods
 * to make an action dependeing on the event issued by
 * the User entity.
 */
@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }

  /**
   * Allows the user's password to be encrypted
   * before this user is stored in the database.
   * @param event
   */
  async beforeInsert(event: InsertEvent<User>) {
    event.entity.password = await UserUtils.encryptPassword(
      event.entity.password,
    );
  }
}
