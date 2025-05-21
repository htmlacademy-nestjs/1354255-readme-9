import { PrismaClient } from '@prisma/client';

const FIRST_POST_UUID = '6d308040-96a2-4162-bea6-2338e9976540';
const SECOND_POST_UUID = 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd';

const FIRST_USER_ID = '658170cbb954e9f5b905ccf4';
const SECOND_USER_ID = '6581762309c030b503e30512';

const tags = ['dev', 'design'];

function getTags() {
  return [{ name: tags[0] }, { name: tags[1] }];
}

const PostTypes = {
  Text: 'TEXT',
  Link: 'LINK',
  Video: 'VIDEO',
  Quote: 'QUOTE',
  Photo: 'PHOTO'
} as const;

function getPosts() {
  return [
    {
      id: FIRST_POST_UUID,
      type: PostTypes.Text,
      content: 'Post content #1',
      authorId: FIRST_USER_ID,
      tags: {
        connect: [{ name: tags[0] }, { name: tags[1] }],
      },
    },
    {
      id: SECOND_POST_UUID,
      type: PostTypes.Photo,
      content:
        '{ "title": "Cats", "url": "https://random.cat/view/662" }',
      authorId: FIRST_USER_ID,
      comments: [
        {
          text: 'Aww :3',
          authorId: FIRST_USER_ID,
        },
        {
          text: 'Awww :3',
          authorId: SECOND_USER_ID,
        },
      ],
    },
  ];
}

async function seedDb(prismaClient: PrismaClient) {
  const mockTags = getTags();
  for (const tag of mockTags) {
    await prismaClient.tag.upsert({
      where: { name: tag.name },
      update: {},
      create: {
        name: tag.name,
      },
    });
  }

  const mockPosts = getPosts();
  for (const post of mockPosts) {
    await prismaClient.post.upsert({
      where: { id: post.id },
      update: {},
      create: {
        type: post.type,
        id: post.id,
        content: post.content,
        tags: post.tags,
        authorId: post.authorId,
        comments: post.comments
          ? {
            create: post.comments,
          }
          : undefined,
      },
    });
  }

  console.info('🤘️ Database was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}


bootstrap();
