import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import Address from './Address';

@Entity('clients')
class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Address, address => address.client, { eager: true })
  addresses: Address[];

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  telephone: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Client;
