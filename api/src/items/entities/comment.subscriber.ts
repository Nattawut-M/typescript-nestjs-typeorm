import {
  BeforeQueryEvent,
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Comment } from './comment.entity';
import { Logger } from '@nestjs/common';

@EventSubscriber()
export class CommentSubscriber implements EntitySubscriberInterface<Comment> {
  private readonly logger = new Logger(CommentSubscriber.name);

  /**
   * Constructor for the CommentSubscriber class.
   *
   * This constructor is used to register the CommentSubscriber as a subscriber to events emitted by the datasource object.
   *
   * @param {DataSource} dataSource - The datasource object to which the subscriber will be registered.
   */
  constructor(datasource: DataSource) {
    // add this subscriber to the datasource
    /* 
        This is typically done to register the CommentSubscriber
        as a subscriber to events emitted by the datasource object.
     */
    datasource.subscribers.push(this);
  }

  listenTo() {
    return Comment;
  }

  beforeInsert(event: InsertEvent<Comment>) {
    const { content, item } = event.entity;
    this.logger.log(
      `Before insert comment: ${content} for item: ${JSON.stringify(item)}`,
    );
  }

  afterInsert(event: InsertEvent<Comment>) {
    const { content, item } = event.entity;
    this.logger.log(
      `After insert comment: ${content} for item: ${JSON.stringify(item)} successfully`,
    );
  }

  beforeQuery(event: BeforeQueryEvent<Comment>): Promise<any> | void {
    this.logger.log(`${event.query} event before query...`);
  }
}
