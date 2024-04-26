// lib/linkedin.ts
import axios from 'axios';
import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs'

export const onLinkedInConnect = async (
  access_token: string,
  linkedInUserId: string
) => {
  if (access_token) {
    // Check if LinkedIn is connected
    const linkedIn_connected = await db.linkedIn.findFirst({
      where: {
        accessToken: access_token,
      },
      include: {
        connections: {
          select: {
            type: true,
          },
        },
      },
    });

    if (!linkedIn_connected) {
      // Create connection
      await db.linkedIn.create({
        data: {
          userId: linkedInUserId,
          accessToken: access_token,
          connections: {
            create: {
              userId: linkedInUserId,
              type: 'LinkedIn',
            },
          },
        },
      });
    }
  }
};

export const getLinkedInConnection = async () => {
  const user = await currentUser();
  if (user) {
    const connection = await db.linkedIn.findFirst({
      where: {
        userId: user.id,
      },
    });
    if (connection) {
      return connection;
    }
  }
  return null;
};
