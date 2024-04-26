// pages/api/post.js
import { requireSession, users } from '@clerk/nextjs/api';

export default requireSession(async (req, res) => {
  const userId = req.session.userId;
  const user = await users.getUser(userId);
  const { accessToken } = user.externalAccounts.find(account => account.provider === "linkedin");

  const { content } = req.body;

  const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      author: 'urn:li:person:YOUR_PERSON_ID',
      lifecycleState: 'PUBLISHED',
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: {
            text: content
          },
          shareMediaCategory: "NONE"
        }
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": "CONNECTIONS"
      }
    })
  });

  if (response.ok) {
    res.status(200).json(await response.json());
  } else {
    res.status(response.status).json({ message: 'Failed to post' });
  }
});
