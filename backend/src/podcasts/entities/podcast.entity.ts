import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
  UpdateDateColumn,
} from 'typeorm';

@Entity('podcasts')
@Index('IDX_PODCAST_TRACK_ID', ['trackId'])
@Index('IDX_PODCAST_TRACK_NAME', ['trackName'])
@Index('IDX_PODCAST_ARTIST_NAME', ['artistName'])
@Index('IDX_PODCAST_CREATED_AT', ['createdAt'])
export class Podcast {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  trackId: number;

  @Column()
  trackName: string;

  @Column({ nullable: true })
  artistName: string;

  @Column({ nullable: true })
  collectionName: string;

  @Column({ nullable: true })
  trackViewUrl: string;

  @Column({ nullable: true })
  artworkUrl100: string;

  @Column({ nullable: true })
  artworkUrl600: string;

  @Column({ nullable: true, type: 'text' })
  feedUrl: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  primaryGenreName: string;

  @Column({ nullable: true, type: 'int' })
  trackCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
