// Story Section Data for Little Nazareth

export interface StorySection {
  id: string;
  type: 'intro' | 'welcome' | 'character' | 'ending';
  backgroundColor: string; // Tailwind class
  layout: 'center' | 'left-right' | 'right-left';
  content: {
    speechBubble?: {
      text: string;
      highlightedWords?: { word: string; color: string }[];
      position?: 'left' | 'right' | 'center';
    };
    polaroid?: {
      characterId: string;
      characterName: string;
      position?: 'left' | 'right';
      rotation?: number; // degrees
      pinColor?: string;
    };
    centerText?: string;
  };
}

export const storyContent: StorySection[] = [
  // 인트로 - 사운드 선택
  {
    id: 'intro',
    type: 'intro',
    backgroundColor: 'bg-gradient-to-br from-green-200 to-blue-200',
    layout: 'center',
    content: {
      centerText: '이 페이지에서는 음악이 나옵니다.\n사운드를 ON으로 해서 즐겨 주세요.',
    },
  },

  // 웰컴 섹션
  {
    id: 'welcome',
    type: 'welcome',
    backgroundColor: 'bg-gradient-to-br from-green-200 to-teal-200',
    layout: 'center',
    content: {
      speechBubble: {
        text: '저 구름 너머, 세상에서 가장 포근한 다락방 리틀 나사렛에 오신 것을 환영합니다.',
        position: 'center',
      },
    },
  },

  // 램비 소개
  {
    id: 'lambie',
    type: 'character',
    backgroundColor: 'bg-gradient-to-br from-blue-200 to-purple-200',
    layout: 'left-right',
    content: {
      polaroid: {
        characterId: 'lamb',
        characterName: '램비 (Lambie)',
        position: 'left',
        rotation: -3,
        pinColor: '#FF6B9D',
      },
      speechBubble: {
        text: '램비는 별명이 수도꼭지예요.\n슬픈 이야기를 들으면 금세 눈가가 촉촉해져서 털이 젖어버리거든요.\n\n사람들은 "뚝! 울지 마"라고 하지만, 램비는 훌쩍거리며 이렇게 말해요.\n"우리... 같이 울자."',
        highlightedWords: [
          { word: '수도꼭지', color: '#60A5FA' },
          { word: '같이 울자', color: '#F472B6' },
        ],
        position: 'right',
      },
    },
  },

  // 아리 소개
  {
    id: 'ari',
    type: 'character',
    backgroundColor: 'bg-gradient-to-br from-yellow-200 to-orange-100',
    layout: 'right-left',
    content: {
      speechBubble: {
        text: '아리는 사실... "으르렁!"을 잘 못해요.\n멋지게 소리치려다가도 긴장해서 "히끅!" 하고 딸꾹질이 튀어나오거든요.\n\n겉모습은 용감한 사자 같지만, 사실 혼자가 무서워 친구들 옆에 꼭 붙어있는 왕껌딱지랍니다.',
        highlightedWords: [
          { word: '으르렁!', color: '#F59E0B' },
          { word: '히끅!', color: '#EF4444' },
          { word: '왕껌딱지', color: '#8B5CF6' },
        ],
        position: 'left',
      },
      polaroid: {
        characterId: 'lion',
        characterName: '아리 (Ari)',
        position: 'right',
        rotation: 2,
        pinColor: '#FBBF24',
      },
    },
  },

  // 다비 소개
  {
    id: 'davi',
    type: 'character',
    backgroundColor: 'bg-gradient-to-br from-pink-200 to-rose-200',
    layout: 'left-right',
    content: {
      polaroid: {
        characterId: 'squirrel',
        characterName: '다비 (Davi)',
        position: 'left',
        rotation: -2,
        pinColor: '#34D399',
      },
      speechBubble: {
        text: '몸집이 제일 작은 다비의 볼은 항상 빵빵해요.\n맛있는 도토리 대신 "용기의 조약돌"을 입안 가득 물고 있거든요.\n\n"겁나면 좀 어때? 그래도 하나 주웠잖아."',
        highlightedWords: [
          { word: '용기의 조약돌', color: '#10B981' },
          { word: '겁나면 좀 어때?', color: '#EC4899' },
        ],
        position: 'right',
      },
    },
  },

  // 코코 소개
  {
    id: 'coco',
    type: 'character',
    backgroundColor: 'bg-gradient-to-br from-purple-200 to-indigo-200',
    layout: 'right-left',
    content: {
      speechBubble: {
        text: '코코는 기도를 하다가도 "아멘" 하기도 전에 잠이 들어버려요.\n늘 질질 끌고 다니는 애착 담요에선 달콤한 초콜릿 향기가 나죠.\n\n세상에서 제일 넓고 따뜻한 등 뒤에서, 오늘 밤은 아무 걱정 없이 꿀잠을 자게 될 거예요.',
        highlightedWords: [
          { word: '아멘', color: '#A78BFA' },
          { word: '초콜릿 향기', color: '#F59E0B' },
          { word: '꿀잠', color: '#FBBF24' },
        ],
        position: 'left',
      },
      polaroid: {
        characterId: 'bear',
        characterName: '코코 (Coco)',
        position: 'right',
        rotation: 3,
        pinColor: '#8B5CF6',
      },
    },
  },

  // 엔딩
  {
    id: 'ending',
    type: 'ending',
    backgroundColor: 'bg-gradient-to-br from-green-200 to-emerald-200',
    layout: 'center',
    content: {
      speechBubble: {
        text: '우리는 당신의 기도를 들어주는 거창한 존재가 아니에요.\n그저 당신이 혼자라고 느낄 때,\n조용히 다가와 털 뭉치 같은 손을 포개어주는 Praying Mate입니다.',
        highlightedWords: [
          { word: 'Praying Mate', color: '#10B981' },
        ],
        position: 'center',
      },
    },
  },
];
