import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Artist } from 'src/artists/artist.entity'
import { Playlist } from 'src/playlists/playlist.entity'
import { Song } from 'src/songs/song.entity'
import { User } from 'src/users/user.entity'
import { DataSource, DataSourceOptions } from 'typeorm'

// Load ENV variable
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const path = require('path')
// const envPath = path.resolve(__dirname, `.env.${process.env.NODE_ENV}`)
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// require('dotenv').config({ path: envPath })
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: configService.get<string>('dbHost'),
      port: configService.get<number>('dbPort'),
      database: configService.get<string>('dbName'),
      username: configService.get<string>('dbUsername'),
      password: configService.get<string>('dbPassword'),
      entities: [User, Playlist, Artist, Song],
      synchronize: false,
      migrations: ['dist/db/migrations/*.js']
    }
  }
}

console.log(process.env.NODE_ENV)
console.log(process.env.DB_HOST)
console.log(process.env.DB_PASSWORD)

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  entities: ['dist/**/*.entity.js'], //1
  synchronize: false, // 2
  migrations: ['dist/db/migrations/*.js'] // 3
}

const dataSource = new DataSource(dataSourceOptions) //4
export default dataSource
