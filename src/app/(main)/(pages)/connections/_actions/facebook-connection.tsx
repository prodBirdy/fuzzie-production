import axios from 'axios';
import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs'

export const onFacebookConnect = async (
  access_token: string,
  id: string
) => {
  if (access_token) {
    //check if Facebook is connected
    const facebook_connected = await db.facebook.findFirst({
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
    })

    if (!facebook_connected) {
      //create connection
      await db.facebook.create({
        data: {
          userId: id,
          accessToken: access_token,
          connections: {
            create: {
              userId: id,
              type: 'Facebook',
             
            },
          },
        },
      })
    }
  }
}

export const getFacebookConnection = async () => {
  const user = await currentUser()
  if (user) {
    const connection = await db.facebook.findFirst({
      where: {
        userId: user.id,
      },
    })
    if (connection) {
      return connection
    }
  }
}

export const getFacebookProfile = async (access_token: string) => {
  const response = await axios.get('https://graph.facebook.com/v12.0/me', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (response) {
    return response.data;
  }
}