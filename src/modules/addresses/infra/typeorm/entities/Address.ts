import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Client from '@modules/clients/infra/typeorm/entities/Client';

@Entity('addresses')
class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Client, client => client.addresses)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column()
  client_id: string;

  @Column()
  cep: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  district: string;

  @Column()
  road: string;

  @Column()
  number: string;

  @Column()
  complement: string;

  @Column()
  type: string;

  @Column()
  is_primary_address: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Address;
