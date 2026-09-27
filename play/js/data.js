// Faith Craft Family Edition content. Bible text: World English Bible (British Edition), public domain.
export const TRANSLATION = "Bible text: World English Bible (British Edition), public domain.";

export const VERSES = {
  gen6_22: { ref: "Genesis 6:22", text: "Thus Noah did. He did all that God commanded him." },
  gen7_9: { ref: "Genesis 7:9", text: "…went by pairs to Noah into the ship, male and female, as God commanded Noah." },
  gen9_13: { ref: "Genesis 9:13", text: "I set my rainbow in the cloud, and it will be a sign of a covenant between me and the earth." },
  sam17_40: { ref: "1 Samuel 17:40", text: "He took his staff in his hand, and chose for himself five smooth stones out of the brook, and put them in the pouch of his shepherd’s bag which he had." },
  josh1_9: { ref: "Joshua 1:9", text: "Haven’t I commanded you? Be strong and courageous. Don’t be afraid. Don’t be dismayed, for the LORD your God is with you wherever you go." },
  ex24_12: { ref: "Exodus 24:12", text: "The LORD said to Moses, “Come up to me on the mountain, and stay here, and I will give you the stone tablets with the law and the commands that I have written, that you may teach them.”" },
  ps119_105: { ref: "Psalm 119:105", text: "Your word is a lamp to my feet, and a light for my path." },
  luke10_37: { ref: "Luke 10:37", text: "He said, “He who showed mercy on him.” Then Jesus said to him, “Go and do likewise.”" },
  eph4_32: { ref: "Ephesians 4:32", text: "And be kind to one another, tender hearted, forgiving each other, just as God also in Christ forgave you." },
  john6_9: { ref: "John 6:9", text: "“There is a boy here who has five barley loaves and two fish, but what are these amongst so many?”" },
  cor9_7: { ref: "2 Corinthians 9:7", text: "Let each man give according as he has determined in his heart, not grudgingly or under compulsion, for God loves a cheerful giver." },
  gen50_20: { ref: "Genesis 50:20", text: "As for you, you meant evil against me, but God meant it for good, to save many people alive, as is happening today." },
  col3_13: { ref: "Colossians 3:13", text: "…bearing with one another, and forgiving each other, if any man has a complaint against any; even as Christ forgave you, so you also do." },
  prov12_22: { ref: "Proverbs 12:22", text: "Lying lips are an abomination to the LORD, but those who do the truth are his delight." },
  eph4_25: { ref: "Ephesians 4:25", text: "Therefore, putting away falsehood, speak truth each one with his neighbour, for we are members of one another." },
};

// "Say it with me" practice (never graded or recorded)
export const PRACTICE = [
  { id: "ps23", ref: "Psalm 23:1", chunks: ["The LORD is my shepherd;", "I shall lack nothing."] },
  { id: "ps56", ref: "Psalm 56:3", chunks: ["When I am afraid,", "I will put my trust", "in you."] },
  { id: "ex4", ref: "Exodus 4:12", chunks: ["Now therefore go,", "and I will be with your mouth,", "and teach you", "what you shall speak."] },
  { id: "phil4", ref: "Philippians 4:13", chunks: ["I can do all things", "through Christ", "who strengthens me."] },
  { id: "josh1", ref: "Joshua 1:9 (part)", chunks: ["Be strong and courageous.", "Don’t be afraid."] },
  { id: "ps119", ref: "Psalm 119:105", chunks: ["Your word is a lamp to my feet,", "and a light for my path."] },
  { id: "sam16", ref: "1 Samuel 16:7 (part)", chunks: ["For man looks at the outward appearance,", "but the LORD looks at the heart."] },
  { id: "eph4", ref: "Ephesians 4:32", chunks: ["And be kind to one another,", "tender hearted,", "forgiving each other,", "just as God also in Christ", "forgave you."] },
  { id: "acts20", ref: "Acts 20:35 (words of Jesus)", chunks: ["It is more blessed", "to give", "than to receive."] },
];

export const VIRTUES = [
  { id: "obedience", name: "Obedience", color: "#4a90d9", letter: "O", verse: "gen6_22", from: "noah", hint: "Help Noah build the ark." },
  { id: "courage", name: "Courage", color: "#e0752d", letter: "C", verse: "josh1_9", from: "david", hint: "Help David at the brook." },
  { id: "wisdom", name: "Wisdom", color: "#8e5cc7", letter: "W", verse: "ps119_105", from: "moses", hint: "Help Moses on the mountain." },
  { id: "kindness", name: "Kindness", color: "#e25a8a", letter: "K", verse: "eph4_32", from: "samaritan", hint: "Help the hurt traveler on the road." },
  { id: "generosity", name: "Generosity", color: "#3aa76d", letter: "G", verse: "cor9_7", from: "loaves", hint: "Talk to Andrew in the village." },
  { id: "forgiveness", name: "Forgiveness", color: "#2bb3b1", letter: "F", verse: "col3_13", from: "joseph", hint: "Visit Joseph in the desert." },
  { id: "honesty", name: "Honesty", color: "#d4a017", letter: "H", verse: "eph4_25", from: "honesty", hint: "Talk to Micah the farmer." },
];

// Vocabulary. lv: 1 = everyone, 3 = Hard only.
export const WORDS = {
  ark: { def: "A very large boat Noah built to keep his family and the animals safe during the flood.", ex: "Noah and his sons built the ark out of wood." },
  obey: { def: "To do what someone in charge tells you to do.", ex: "Noah chose to obey God, even when it was hard work." },
  flood: { def: "A huge amount of water covering land that is usually dry.", ex: "The flood covered the land, but the ark floated safely." },
  covenant: { def: "A serious promise or agreement. God’s covenant is a promise He always keeps.", ex: "The rainbow is a sign of God’s covenant." },
  righteous: { def: "Doing what is right in God’s eyes.", ex: "The Bible calls Noah a righteous man." },
  shepherd: { def: "A person whose job is to take care of sheep.", ex: "David was a shepherd who protected his sheep." },
  brook: { def: "A small stream of water.", ex: "David found smooth stones in the brook." },
  courage: { def: "Being brave and doing what is right, even when you feel afraid.", ex: "It took courage for David to step forward." },
  trust: { def: "To believe that someone is good and will keep their word.", ex: "David chose to trust God." },
  confident: { def: "Feeling sure about something or someone.", ex: "David was confident because God was with him." },
  tablet: { def: "A flat piece of stone with words carved into it.", ex: "God’s commandments were written on stone tablets." },
  commandment: { def: "A rule or instruction given by someone in charge. God gave Ten Commandments.", ex: "One commandment is to honour your father and mother." },
  faithful: { def: "Loyal; someone who keeps their promises and does not give up.", ex: "Moses stayed faithful to God." },
  wisdom: { def: "Knowing what is true and right, and making good choices.", ex: "Reading God’s Word helps us grow in wisdom." },
  eloquent: { def: "Able to speak smoothly and well.", ex: "Moses said he was not eloquent, but God helped him." },
  neighbor: { def: "Someone who lives near you. In Jesus’ story, it means anyone who needs your help.", ex: "Jesus taught us to love our neighbor." },
  mercy: { def: "Kindness and help given to someone who is hurting or in trouble.", ex: "The Samaritan showed mercy to the hurt man." },
  compassion: { def: "Feeling sorry for someone’s trouble and wanting to help.", ex: "He was moved with compassion when he saw the man." },
  traveler: { def: "A person who is going on a trip from one place to another.", ex: "The traveler was hurt by the side of the road." },
  samaritan: { def: "A person from the land of Samaria. In Jesus’ time, Jews and Samaritans often did not get along.", ex: "The Samaritan was the one who stopped to help." },
  generous: { def: "Happy to share and give to others.", ex: "The boy was generous with his lunch." },
  loaf: { def: "Bread baked in one piece. More than one loaf is called loaves.", ex: "The boy had five loaves of bread." },
  disciple: { def: "A follower and student of a teacher. Jesus’ disciples followed Him and learned from Him.", ex: "Andrew was one of Jesus’ disciples." },
  crowd: { def: "A large group of people together in one place.", ex: "A huge crowd came to hear Jesus." },
  grudgingly: { def: "In an unwilling, unhappy way.", ex: "God wants us to give cheerfully, not grudgingly." },
  forgive: { def: "To stop holding a wrong against someone and choose not to pay them back.", ex: "Joseph chose to forgive his brothers." },
  jealous: { def: "Upset because someone else has something you want.", ex: "Joseph’s brothers were jealous of his special coat." },
  famine: { def: "A time when there is not enough food for many people.", ex: "Joseph stored grain before the famine came." },
  grain: { def: "Seeds from plants like wheat and barley, used to make bread.", ex: "The brothers came to Egypt to buy grain." },
  reconcile: { def: "To become friends again after a fight or problem.", ex: "Joseph and his brothers were reconciled." },
  honest: { def: "Telling the truth and not cheating or stealing.", ex: "Being honest helps people trust you." },
  confess: { def: "To admit that you did something wrong.", ex: "It took courage to confess the mistake." },
  apologize: { def: "To say you are sorry for something you did.", ex: "I will apologize and help fix it." },
  responsible: { def: "Taking care of your jobs and fixing your own mistakes.", ex: "A responsible person helps clean up their mess." },
  integrity: { def: "Being honest and doing right, even when no one is watching.", ex: "Integrity means telling the truth when it is hard." },
};

// Extra kid-friendly definitions for "tap any word"
export const GLOSSARY = {
  god: "The one true God, who made everything and loves us.",
  lord: "A title meaning master or ruler. In the Bible, the LORD is God’s name.",
  bible: "God’s Word: the holy book Christians read to learn about God.",
  jesus: "God’s Son, who came to earth, taught people, and showed God’s love.",
  christ: "A title for Jesus. It means the chosen one, or Messiah.",
  promise: "Saying you will surely do something.",
  rainbow: "An arch of colours in the sky. God made it a sign of His promise.",
  pairs: "Groups of two.", pair: "A group of two.",
  planks: "Long, flat pieces of wood used for building.", plank: "A long, flat piece of wood used for building.",
  mission: "An important job to do.",
  staff: "A long walking stick, often used by shepherds.",
  pouch: "A small bag.", smooth: "Flat and even, with no bumps.",
  law: "Rules that people are supposed to follow.",
  commands: "Instructions that must be followed.", commanded: "Told someone to do something.",
  priest: "A person who served God at the temple and led worship.",
  levite: "A man from the family of Levi who helped at God’s temple.",
  bandage: "A strip of cloth used to cover and protect a wound.", bandages: "Strips of cloth used to cover and protect wounds.",
  wounds: "Places where the body is hurt, like cuts.",
  inn: "A small hotel where travelers can rest.",
  barley: "A kind of grain used to make bread.",
  egypt: "A country in Africa, next to the Nile River.",
  pharaoh: "The king of ancient Egypt.",
  truth: "What is really true; not a lie.", lie: "Something said that you know is not true.",
  fence: "A wall made of wood or other material around a field.",
  pen: "A fenced area where animals are kept.",
  heart: "In the Bible, your heart means your inner self: your thoughts and choices.",
  afraid: "Feeling scared.", dismayed: "Upset and discouraged.",
  cheerful: "Happy and glad.", giver: "Someone who gives.",
  compulsion: "Being forced to do something.",
  abomination: "Something God strongly dislikes because it is wrong.",
  delight: "Great happiness and joy.", falsehood: "Something that is not true; a lie.",
  lamp: "Something that gives light.", path: "A small trail or way to walk.",
  tender: "Gentle and caring.", likewise: "In the same way.",
  virtue: "A good quality in a person, like kindness or honesty.",
  kindness: "Being friendly, caring, and helpful.", generosity: "Being happy to share and give.",
  forgiveness: "Choosing to forgive someone.", honesty: "Always telling the truth.",
  obedience: "Doing what you are told by someone in charge.",
  prophet: "A person God chose to share His messages.",
  miracle: "An amazing event that only God can do.",
  temple: "A special building where people worshipped God.",
  measurements: "Numbers that tell how long, wide, or tall something is.",
  enormous: "Very, very big.", impressive: "Making people admire it.",
  appearance: "How someone or something looks.", outward: "On the outside.",
  challenge: "Something hard that tests you.", strength: "Being strong.",
  patiently: "Calmly, without getting upset or hurrying.",
  eventually: "After a long time.", famous: "Known by many people.",
  covenants: "Serious promises.", sign: "Something that shows or reminds you of something.",
  dove: "A gentle white or grey bird. A dove brought Noah an olive leaf.",
  olive: "A small fruit that grows on olive trees.",
  mountain: "A very high hill.", summit: "The very top of a mountain.",
  sheep: "A farm animal with thick, woolly fur.",
  loaves: "More than one loaf of bread.",
  thanks: "Words that show you are grateful.",
  sorry: "Feeling sad about something wrong you did.",
  trouble: "A problem or a hard situation.",
  worried: "Feeling nervous that something bad might happen.",
  respect: "Treating someone as important and valuable.",
  zacchaeus: "A tax collector who met Jesus and paid back the people he had cheated.",
};

// NPC definitions (positions in world block coords)
export const NPCS = [
  { id: "ruth", name: "Ruth", role: "guide", x: 50.5, z: 49.5, look: { robe: "#c9a0dc", sash: "#7d4f9e", skin: "#e8b98a", hair: "#5a3a1e", wrap: "#f1e3c6", beard: null } },
  { id: "noah", name: "Noah", quest: "noah", x: 53.5, z: 37.5, look: { robe: "#8b6b47", sash: "#d8c79a", skin: "#d9a577", hair: "#eeeeee", wrap: "#d8c79a", beard: "#f2f2f2" } },
  { id: "david", name: "David", quest: "david", x: 39.5, z: 44.5, look: { robe: "#3f7fc4", sash: "#a0522d", skin: "#e0ac7e", hair: "#b5651d", wrap: null, beard: null } },
  { id: "moses", name: "Moses", quest: "moses", x: 60.5, z: 63.5, look: { robe: "#b33b3b", sash: "#e8d9a8", skin: "#d2996b", hair: "#9a9a9a", wrap: "#e8d9a8", beard: "#bdbdbd", staff: true } },
  { id: "samaritan", name: "Hurt Traveler", quest: "samaritan", x: 44.5, z: 76.5, lying: true, look: { robe: "#9c8f7a", sash: "#6b5d48", skin: "#d8a47a", hair: "#3b2a1a", wrap: null, beard: "#3b2a1a" } },
  { id: "andrew", name: "Andrew", quest: "loaves", x: 18.5, z: 76.5, look: { robe: "#4f8f4f", sash: "#d6c38f", skin: "#d49b6a", hair: "#4a2f1a", wrap: null, beard: "#4a2f1a" } },
  { id: "hungry1", name: "Villager", role: "hungry", x: 12.5, z: 72.5, look: { robe: "#c77d3a", sash: "#6e3f1a", skin: "#c68b59", hair: "#2b1d12", wrap: "#e9d7b0", beard: null } },
  { id: "hungry2", name: "Villager", role: "hungry", x: 27.5, z: 80.5, look: { robe: "#5a7fa8", sash: "#e0d2a6", skin: "#e2b48c", hair: "#6b4423", wrap: null, beard: "#6b4423" } },
  { id: "hungry3", name: "Villager", role: "hungry", x: 18.5, z: 86.5, look: { robe: "#a8577f", sash: "#f0dcb4", skin: "#b9804f", hair: "#1e140c", wrap: "#f0dcb4", beard: null } },
  { id: "joseph", name: "Joseph", quest: "joseph", x: 72.5, z: 20.5, look: { robe: "#f4f1e6", sash: "#e0b030", skin: "#c98f5e", hair: "#2c1c10", wrap: null, beard: null, collar: "#e0b030" } },
  { id: "bro1", name: "Reuben", role: "brother", x: 68.5, z: 26.5, look: { robe: "#7a6a52", sash: "#4e4232", skin: "#c99263", hair: "#3a2616", wrap: "#b8a888", beard: "#3a2616" } },
  { id: "bro2", name: "Judah", role: "brother", x: 71.5, z: 27.5, look: { robe: "#6d7f5a", sash: "#3f4a33", skin: "#cf9a6b", hair: "#2a1b10", wrap: "#c2b48e", beard: "#2a1b10" } },
  { id: "bro3", name: "Benjamin", role: "brother", x: 74.5, z: 26.5, look: { robe: "#8a5a6a", sash: "#4a2f39", skin: "#d8a57a", hair: "#4b3020", wrap: null, beard: null } },
  { id: "micah", name: "Micah", quest: "honesty", x: 16.5, z: 91.5, look: { robe: "#9a7b4f", sash: "#4f6b35", skin: "#dba77b", hair: "#704a2a", wrap: "#e4d4a4", beard: "#704a2a" } },
];

// Lines are arrays of short strings (1-2 sentences each). A line that starts with "(" is read by the narrator.
export const QUESTS = {
  noah: {
    title: "Noah’s Ark", npc: "noah", virtue: "obedience", reward: "gen9_13",
    words: ["ark", "obey", "flood", "covenant", "righteous"],
    intro: ["Oh, hello there! I’m Noah. Am I glad to see you!", "God asked me to build a giant boat. It’s called an ark.", "It sounded strange at first. But I trust God, so I said yes.", "Could you give me a hand? We need planks, and then the animals, two by two."],
    start: "Let’s build it!",
    steps: [
      { type: "planks", count: 10, text: "Place planks in the glowing ark area", label: "Planks placed" },
      { type: "lead", species: "sheep", zone: "ark", count: 2, text: "Lead 2 sheep into the ark. Walk close to a sheep and it will follow you.", label: "Sheep in the ark" },
      { type: "lead", species: "cow", zone: "ark", count: 2, text: "Now lead 2 cows into the ark.", label: "Cows in the ark" },
      { type: "talk", npc: "noah", text: "Go back and talk to Noah" },
    ],
    outro: ["Look at that! The ark is ready, and the animals are safe inside.", "We did it together, just like God asked.", "After the flood, God put a rainbow in the sky. It’s His promise. Look up!"],
    done: ["Every time I see a rainbow, I smile.", "It reminds me that God always keeps His promises."],
    remind: "You’re doing great! Just follow the arrow.",
  },
  david: {
    title: "Five Smooth Stones", npc: "david", virtue: "courage", reward: "sam17_40",
    words: ["shepherd", "brook", "courage", "trust", "confident"],
    intro: ["Hey, friend! I’m David. I take care of my dad’s sheep.", "Some days I feel small. Some days I feel scared.", "But I’ve learned something. When I trust God, I can be brave.", "Can you help me? I need five smooth stones from the brook."],
    start: "I’ll find them!",
    steps: [
      { type: "collect", item: "pebble", count: 5, text: "Find 5 smooth stones by the brook", label: "Smooth stones" },
      { type: "talk", npc: "david", text: "Bring the stones to David" },
    ],
    outro: ["Five smooth stones! These are perfect. Thank you!", "Here’s a secret. Being brave doesn’t mean you never feel scared.", "It means you trust God, even when you do."],
    done: ["God looks at your heart. Not how big or strong you are.", "Thanks again for your help at the brook!"],
    remind: "Look on the sandy bank of the brook. The stones are shiny.",
  },
  moses: {
    title: "The Mountain of God", npc: "moses", virtue: "wisdom", reward: "ex24_12",
    words: ["tablet", "commandment", "faithful", "wisdom", "eloquent"],
    intro: ["Hello, my friend. My name is Moses.", "Can I tell you something? Talking was always hard for me.", "When God called me, I said, “I can’t speak well.”", "And God said, “I will be with your mouth.” He helped me every time.", "There is something special at the top of this mountain. Will you climb up and bring down the stone tablets?"],
    start: "I’ll climb it!",
    steps: [
      { type: "reach", where: "summit", text: "Climb to the top of Mount Sinai" },
      { type: "collect", item: "tablets", count: 1, text: "Pick up the stone tablets", label: "Tablets" },
      { type: "talk", npc: "moses", text: "Bring the tablets down to Moses" },
    ],
    outro: ["You found them! Thank you for climbing all that way.", "God’s rules show us how to love Him, and how to love each other.", "His Word is like a lamp. It helps us see the right path."],
    done: ["Remember, God can use you, even when things feel hard.", "He helped me speak. He will help you too."],
    remind: "Keep climbing! The top of the mountain has snow on it.",
  },
  samaritan: {
    title: "The Good Samaritan", npc: "samaritan", virtue: "kindness", reward: "luke10_37",
    words: ["neighbor", "mercy", "compassion", "traveler", "samaritan"],
    intro: ["(Jesus once told a story about a man who was hurt on a road.)", "Ow. Hello? Can you help me? I fell and hurt my leg.", "A priest walked right past me. Then another man walked past too."],
    choice: {
      prompt: "What will you do?",
      options: [
        { text: "Keep walking. Someone else will help.", good: false, reply: ["That’s what the others did. It’s easy to just walk by.", "But Jesus asks us to help anyone who needs it. Want to try again?"] },
        { text: "Say “Get well soon” and leave.", good: false, reply: ["That’s a kind thing to say. But he really needs help right now.", "Let’s try again. What else could you do?"] },
        { text: "Stop and help him.", good: true, reply: ["Oh, thank you! That’s real kindness.", "Could you bring me some water and bandages? The arrow will show you where."] },
      ],
    },
    steps: [
      { type: "collect", item: "water", count: 1, text: "Get a jar of water from the village well", label: "Water jar" },
      { type: "collect", item: "bandage", count: 1, text: "Find bandages inside the inn", label: "Bandages" },
      { type: "talk", npc: "samaritan", text: "Bring the water and bandages to the traveler" },
    ],
    outro: ["Ahh, that’s so much better. Thank you, friend.", "Jesus said a true neighbor is someone who shows mercy.", "Today, that was you."],
    done: ["You stopped when others walked by. I won’t forget that!"],
    remind: "Follow the arrow to find the water and bandages.",
  },
  loaves: {
    title: "Loaves and Fish", npc: "andrew", virtue: "generosity", reward: "john6_9",
    words: ["generous", "loaf", "disciple", "crowd", "grudgingly"],
    intro: ["Hi! I’m Andrew. I follow Jesus.", "So many people came to hear Him today. And now they’re all hungry!", "Jesus asked where we can find food. Hey, I see you have a lunch.", "Five little loaves of bread and two fish."],
    choice: {
      prompt: "Will you share your lunch?",
      options: [
        { text: "No way. It’s my lunch.", good: false, reply: ["That’s okay. It’s normal to feel that way. You’re hungry too.", "But in the real story, a boy shared his lunch, and Jesus did something amazing. Want to try again?"] },
        { text: "Yes. Jesus can have it.", good: true, reply: ["Thank you! Jesus thanked God and started sharing it out.", "And guess what? There was more than enough for everyone! Let’s hand out the bread."] },
      ],
    },
    steps: [
      { type: "share", npcs: ["hungry1", "hungry2", "hungry3"], text: "Share bread with 3 hungry villagers", label: "People fed" },
      { type: "talk", npc: "andrew", text: "Go back to Andrew" },
    ],
    outro: ["Everyone ate until they were full. And look, twelve baskets left over!", "God can do big things with whatever we share."],
    done: ["God loves a cheerful giver. Thanks for sharing!"],
    remind: "Look for people with a bread sign over their heads.",
  },
  joseph: {
    title: "Joseph Forgives", npc: "joseph", virtue: "forgiveness", reward: "gen50_20",
    words: ["forgive", "jealous", "famine", "grain", "reconcile"],
    intro: ["Hello! I’m Joseph.", "A long time ago, my brothers were jealous of me. They sent me far away to Egypt.", "It was a hard time. But God was with me the whole way.", "Now I help lead Egypt. I saved lots of grain for the hungry years.", "And look who just came asking for food. My brothers! They don’t know it’s me."],
    choice: {
      prompt: "What should Joseph do?",
      options: [
        { text: "Send them away. They deserve it.", good: false, reply: ["They really did hurt Joseph. It’s okay to feel upset about that.", "But Joseph chose something harder, and better. Want to try again?"] },
        { text: "Forgive them and give them food.", good: true, reply: ["Yes. Forgiving doesn’t mean what they did was okay.", "It means choosing love, and letting God handle the rest. Let’s bring them grain."] },
      ],
    },
    steps: [
      { type: "collect", item: "grain", count: 3, text: "Get 3 sacks of grain from the storehouse", label: "Grain sacks" },
      { type: "share", npcs: ["bro1", "bro2", "bro3"], text: "Give grain to your 3 brothers", label: "Brothers helped" },
      { type: "talk", npc: "joseph", text: "Go back to Joseph" },
    ],
    outro: ["We hugged, and we cried happy tears. My family is together again!", "God took something bad and turned it into something good."],
    done: ["Forgiving them set my heart free. Thank you, friend."],
    remind: "The storehouse is the brick building in the desert.",
  },
  honesty: {
    title: "The Broken Fence", npc: "micah", virtue: "honesty", reward: "prov12_22",
    words: ["honest", "confess", "apologize", "responsible", "integrity"],
    intro: ["(Earlier, while you were building, you bumped Micah’s fence by mistake. It made a hole.)", "Oh no. My fence has a big hole in it! And one of my sheep got out.", "Do you know what happened?"],
    choice: {
      prompt: "What will you say?",
      options: [
        { text: "No idea. Maybe it was the wind.", good: false, reply: ["Telling the truth can feel scary, especially after a mistake.", "But God loves honesty, and so do good friends. Want to try again?"] },
        { text: "Your sheep probably did it.", good: false, reply: ["Hmm. Blaming someone else, even a sheep, isn’t the truth.", "Take a deep breath. You can try again."] },
        { text: "It was me. I’m sorry. I’ll help fix it.", good: true, reply: ["Thank you for telling me the truth. That took courage.", "Hey, accidents happen. Let’s fix it together!"] },
      ],
    },
    steps: [
      { type: "lead", species: "sheep", zone: "pen", count: 1, lost: true, text: "Find the lost sheep and lead it back into the pen", label: "Sheep home" },
      { type: "fill", count: 6, text: "Fix the fence: place 6 blocks in the glowing gap", label: "Fence blocks" },
      { type: "talk", npc: "micah", text: "Talk to Micah" },
    ],
    outro: ["The fence looks great, and my sheep is safe at home!", "You know what? I trust you even more now, because you told me the truth."],
    done: ["Being honest makes friendships strong. Thanks again!"],
    remind: "Follow the arrow. Take your time.",
  },
};
export const QUEST_ORDER = ["noah", "david", "moses", "samaritan", "loaves", "joseph", "honesty"];

export const NPC_LINES = {
  ruth: ["Hi there! I’m Ruth. Welcome to Faith Craft!", "See the people with a gold mark over their heads? They could use your help.", "The arrow at the top of the screen shows you where to go next.", "And you can build anything you like, anywhere. Have fun!"],
  hungry: ["My tummy is rumbling! I hope there’s food soon.", "Jesus is teaching over there. Have you heard Him?"],
  hungryFed: ["That was the best bread I’ve ever had. Thank you!"],
  brother: ["We came a long way to buy food for our families."],
  brotherFed: ["Our brother Joseph forgave us. God is so good!"],
  shareLines: {
    hungry1: ["Bread for me? Oh, thank you so much!"],
    hungry2: ["Mmm, that smells wonderful. Bless you!"],
    hungry3: ["I was so hungry. Thank you for sharing!"],
    bro1: ["Joseph? Is it really you? We are so sorry."],
    bro2: ["You forgive us? Thank you, brother."],
    bro3: ["Now our families will have food. Thank you!"],
  },
  busy: "Hi! You’re already helping with another mission.",
  busyPrompt: "What do you want to do?",
};
// Friendly hellos when you walk up (shown in a bubble)
export const HELLOS = { ruth: "Hi there!", noah: "Hello, friend!", david: "Hey!", moses: "Welcome!", samaritan: "Help, please…", andrew: "Hi!", hungry1: "Hello!", hungry2: "Shalom!", hungry3: "Hi!", joseph: "Hello!", bro1: "Hello.", bro2: "Hi.", bro3: "Hello!", micah: "Oh, hi!" };
// Which voice each character uses: m = man's voice, n = narrator (woman's voice)
export const NPC_VOICE = { ruth: "n", hungry1: "n", hungry3: "n", noah: "m", david: "m", moses: "m", samaritan: "m", andrew: "m", hungry2: "m", joseph: "m", bro1: "m", bro2: "m", bro3: "m", micah: "m" };

// Short spoken feedback. Always kind: never "wrong".
export const PHRASES = {
  right: ["Yes! That’s right.", "You got it!", "Nice work!", "Great job!", "That’s it!", "Awesome!"],
  tryAgain: ["Good try. Here’s the answer.", "Nice try. Let’s look at the answer."],
  retellRight: "You put it in the right order!",
  retellTry: "Good try! Here is the right order.",
  stepDone: ["Step done! Nice work.", "Great! On to the next step.", "You did it! Step done."],
  missionDone: "Mission complete! Way to go!",
  woodHint: "Use wood blocks for the ark.",
  newWords: "Here are some new words for this mission.",
  raYes: ["You read it!", "Wonderful reading!", "You did it! Great reading."],
  raTry: "Nice try! Listen, and try again.",
  raEffort: "Great effort! Here’s a star for practicing. You can move on.",
  raNoHear: "I didn’t hear anything. Tap the microphone and try again.",
  raSelf: "That was you! Nice job practicing.",
  saidIt: ["Wonderful! You get a star for practicing.", "Great practicing! Say it as many times as you like."],
  results: ["Goal reached! You mastered this.", "Good work! Keep practicing to reach the goal.", "Good effort! Practice helps. You can try again anytime."],
  levelUp: { 2: "Level up! You are ready for Medium reading.", 3: "Level up! You are ready for Hard reading." },
  levelDown: { 1: "Let’s practice at Easy for a while.", 2: "Let’s practice at Medium for a while." },
  welcome: "Welcome to Faith Craft! Let’s build, read, and have fun.",
};
export const LEVEL_NAMES = ["", "Easy", "Medium", "Hard"];
export const BLOCK_HOTBAR = [8, 1, 2, 3, 4, 5, 6, 10, 9, 11, 12, 14];

// ---------- Talk menu (all lines are pre-recorded; no free chat) ----------
// hints: [not started, ...one per step..., done]. "giver" = said by the mission character (first person),
// "helper" = said by Ruth, villagers, or the brothers (about the mission).
export const TALK = {
  labels: { again: "Tell me the mission again.", next: "What do I do next?", story: "Tell me the story.", verse: "Say a Bible verse.", bye: "Goodbye.", replay: "Hear the mission again.", start: "Start the mission.", finish: "Finish the mission.", bread: "Give bread.", grain: "Give grain.", hello: "Say hello." },
  open: "What would you like to talk about?",
  noCatch: "Hmm, I didn’t catch that. You can tap a button, or try again!",
  bye: "Goodbye, friend! Come back any time.",
  verseLead: "Here is a verse from the Bible.",
  allDone: "You finished every mission! You can build anything you like.",
  allDoneStory: "The Bible is full of true stories about God and His people. You helped in every one of them here. Great job!",
  ruthVerse: "ps119_105",
  hints: {
    noah: {
      giver: ["I need your help to build the ark. Tap the star button to start!", "Put wood planks in the glowing box by the ark. Pick the planks at the bottom, then tap Place.", "Walk close to a sheep, and it will follow you. Then walk into the ark. We need two sheep.", "Now we need two cows. Walk close to a cow, then lead it into the ark.", "The animals are in! Tap the star button, and we will finish the ark.", "The ark is done, and the animals are safe. Thank you! Look for the rainbow in the sky."],
      helper: ["Noah needs help to build the ark. Look for him. He has a gold mark over his head.", "Put wood planks in the glowing box by the ark.", "Lead two sheep into the ark. Walk close to a sheep, and it will follow you.", "Lead two cows into the ark.", "Go back and talk to Noah.", "You helped Noah build the ark. Great job!"],
    },
    david: {
      giver: ["I need five smooth stones from the brook. Tap the star button to help me.", "Look on the sandy bank by the brook. Walk over the shiny stones to pick them up.", "You have all five stones! Tap the star button to give them to me.", "We found all five stones. Thank you, brave friend!"],
      helper: ["David needs help. Look for him by the brook.", "Find five smooth stones on the sandy bank of the brook.", "Take the stones back to David.", "You helped David find five smooth stones. Great job!"],
    },
    moses: {
      giver: ["Will you climb the mountain for me? Tap the star button to start.", "Climb up the mountain. Follow the arrow, and jump up the blocks. The top has snow on it.", "Look at the very top. Walk to the stone tablets to pick them up.", "You have the tablets! Bring them to me, then tap the star button.", "You brought the tablets down. God’s Word is like a lamp for our path."],
      helper: ["Moses needs help. Look for him by the big mountain.", "Climb to the top of the mountain. Follow the arrow.", "Pick up the stone tablets at the top.", "Take the tablets down to Moses.", "You helped Moses bring down the tablets. Great job!"],
    },
    samaritan: {
      giver: ["Ow, my leg hurts. Please tap the star button to help me.", "Please get a jar of water. It is at the well in the village. Follow the arrow.", "Now please find bandages. They are inside the inn.", "You have the water and bandages! Tap the star button to help me.", "My leg feels so much better. Thank you for stopping to help me."],
      helper: ["A man is hurt on the road. Look for him, and help him.", "Get a jar of water from the well in the village.", "Find the bandages inside the inn.", "Take the water and bandages to the hurt man.", "You helped the hurt man on the road. That was so kind!"],
    },
    loaves: {
      giver: ["So many people are hungry. Tap the star button to help me.", "Give bread to three hungry people. Look for the bread sign over their heads. Walk up to each one and tap the star button.", "Everyone has bread! Tap the star button to tell me about it.", "Everyone ate until they were full. Thank you for sharing!"],
      helper: ["Andrew needs help. Look for him in the village.", "Give bread to three hungry people. Look for the bread sign over their heads.", "Go back to Andrew, and talk to him.", "You shared bread with everyone. Great job!"],
    },
    joseph: {
      giver: ["My brothers need food. Tap the star button to help me.", "Get three sacks of grain from the storehouse. It is the brick building in the desert.", "Next, give grain to my three brothers. Walk up to each one and tap the star button.", "My brothers have food! Tap the star button to finish.", "My family is together again. Thank you, friend!"],
      helper: ["Joseph needs help. Look for him in the desert.", "Get three sacks of grain from the brick storehouse.", "Give grain to the three brothers.", "Go back and talk to Joseph.", "You helped Joseph forgive his brothers. Great job!"],
    },
    honesty: {
      giver: ["My fence has a hole in it. Tap the star button to talk with me about it.", "My lost sheep is out in the field. Walk close to it, and lead it back into the pen.", "Next, please fix the fence. Place six blocks in the glowing gap.", "The fence is fixed! Tap the star button to finish.", "My fence is fixed, and my sheep is safe. Thank you for telling the truth."],
      helper: ["Micah the farmer needs help. Look for him by his sheep pen.", "Find the lost sheep, and lead it back into the pen.", "Fix the fence. Place six blocks in the glowing gap.", "Go back and talk to Micah.", "You told the truth and fixed the fence. Great job!"],
    },
  },
  stories: {
    noah: { giver: "God told me to build a big boat called an ark. I obeyed God, and I built it. My family and the animals went in, and the ark kept us safe in the flood. Then God put a rainbow in the sky as His promise.", helper: "God told Noah to build a big boat called an ark. Noah did just what God said. His family and the animals went in, and the ark kept them safe in the flood. Then God put a rainbow in the sky as His promise." },
    david: { giver: "I was a young shepherd boy. One day, everyone around me was afraid of a big problem. I trusted God, and I was brave. God can help you be brave too.", helper: "David was a young shepherd boy. One day, everyone around him was afraid of a big problem. David trusted God and was brave." },
    moses: { giver: "God called me to lead His people out of Egypt. I was afraid, because talking was hard for me. God said He would help me speak. On the mountain, God gave me His good rules on stone tablets.", helper: "God called Moses to lead His people. Moses was afraid, because talking was hard for him. God said He would help him speak. On the mountain, God gave Moses His good rules on stone tablets." },
    samaritan: { giver: "Jesus told a story about a man like me. I got hurt on a road, and two men walked past. Then a kind Samaritan stopped to help me. Jesus wants us to help like that too.", helper: "Jesus told a story about a man who got hurt on a road. Two men walked past him. Then a kind Samaritan stopped to help. Jesus wants us to help like that too." },
    loaves: { giver: "One day, a big crowd came to hear Jesus, and they got hungry. A boy shared his lunch of five loaves and two fish. Jesus thanked God, and there was food for everyone. There were even twelve baskets left over!" },
    joseph: { giver: "My brothers were jealous of me, and they sent me away to Egypt. But God was with me, and I became a leader there. When my brothers came for food, I forgave them. God turned something bad into something good.", helper: "Joseph’s brothers were jealous of him, and they sent him away to Egypt. But God was with Joseph, and he became a leader there. When his brothers came for food, Joseph forgave them. God turned something bad into something good." },
    honesty: { giver: "The Bible says God is glad when we tell the truth. When we make a mistake, we can say sorry and help fix it. Being honest helps friends trust each other." },
  },
};
// Which mission a helper character talks about
export const HELPER_QUEST = { hungry1: "loaves", hungry2: "loaves", hungry3: "loaves", bro1: "joseph", bro2: "joseph", bro3: "joseph" };

// ---------- Mission text at other reading levels ----------
// 'k' = Pre-K and K (very short, always read aloud). 'adv' = grades 4-8. The base text above is grades 1-3.
// steps: new text for each step, in order. Scripture quotes stay word-for-word (World English Bible).
export const QUEST_TIERS = {
  k: {
    noah: { intro: ["Hi! I am Noah.", "God told me to make a big boat.", "It is called an ark.", "Can you help me?"], steps: ["Put wood in the glowing box", "Bring 2 sheep to the ark", "Bring 2 cows to the ark", "Go back to Noah"], outro: ["We did it! The ark is done.", "The animals are safe.", "Look up! God made a rainbow."], done: ["God keeps His promises."], remind: "Follow the arrow." },
    david: { intro: ["Hi! I am David.", "I take care of sheep.", "God helps me be brave.", "Can you find five stones for me?"], steps: ["Find 5 stones by the water", "Go back to David"], outro: ["Five stones! Thank you!", "God helps us be brave."], done: ["Thank you, friend!"], remind: "Look by the water." },
    moses: { intro: ["Hi! I am Moses.", "Talking was hard for me.", "God said, “I will help you.”", "Can you go up the mountain for me?"], steps: ["Go up the mountain", "Get the stone tablets", "Go back to Moses"], outro: ["You got them! Thank you!", "God’s rules help us love."], done: ["God helps us do hard things."], remind: "Go up, up, up!" },
    samaritan: { intro: ["(Jesus told a story about a hurt man.)", "Ow! I am hurt. Can you help me?", "Two men walked by me."], choice: { prompt: "What will you do?", options: [{ text: "Walk away." }, { text: "Say bye." }, { text: "Help him." }] }, steps: ["Get water from the well", "Get bandages from the inn", "Go back to the hurt man"], outro: ["Thank you! I feel better.", "You were kind, like Jesus said."], done: ["You helped me. Thank you!"], remind: "Follow the arrow." },
    loaves: { intro: ["Hi! I am Andrew.", "The people are hungry.", "You have a lunch.", "Five little loaves of bread and two fish."], choice: { prompt: "Will you share?", options: [{ text: "No." }, { text: "Yes!" }] }, steps: ["Give bread to 3 people", "Go back to Andrew"], outro: ["Everyone ate! There was lots left.", "God does big things when we share."], done: ["Thank you for sharing!"], remind: "Find the bread signs." },
    joseph: { intro: ["Hi! I am Joseph.", "My brothers sent me away.", "But God was with me.", "Now they need food."], choice: { prompt: "What should Joseph do?", options: [{ text: "Send them away." }, { text: "Forgive them." }] }, steps: ["Get 3 bags of grain", "Give grain to 3 brothers", "Go back to Joseph"], outro: ["My family is back together!", "God turned bad into good."], done: ["Forgiving is good. Thank you!"], remind: "Find the brick house." },
    honesty: { intro: ["(You bumped Micah’s fence by mistake.)", "Oh no! My fence has a hole.", "Do you know what happened?"], choice: { prompt: "What will you say?", options: [{ text: "Not me." }, { text: "The sheep did it." }, { text: "It was me. I’m sorry." }] }, steps: ["Bring the lost sheep home", "Put 6 blocks in the gap", "Talk to Micah"], outro: ["The fence is fixed! My sheep is home.", "Thank you for telling the truth."], done: ["Telling the truth is good!"], remind: "Follow the arrow." },
  },
  adv: {
    noah: { intro: ["Welcome, friend. I’m Noah, and I’ve been given an unusual assignment.", "God instructed me to build an enormous vessel called an ark, large enough for my family and pairs of every kind of animal.", "It seemed like a strange plan, but I chose to trust God and obey.", "Would you help me finish? We need lumber for the hull, and then the animals must come aboard two by two."], steps: ["Place wooden planks inside the glowing construction zone", "Guide 2 sheep into the ark. Walk near a sheep, and it will follow you.", "Now guide 2 cows aboard the ark.", "Return to Noah and report your progress"], outro: ["Remarkable work. The ark is finished, and every animal is safely aboard.", "Obedience isn’t always easy, but it’s always worth it.", "After the flood, God placed a rainbow in the clouds as the sign of His covenant. Look up!"], done: ["Whenever I see a rainbow, I remember that God is faithful to every promise."], remind: "Check the objective list, and follow the arrow." },
    david: { intro: ["Hey there. I’m David, the youngest in my family. I watch my father’s flocks.", "Out here, I’ve had plenty of moments when I felt small and uncertain.", "What I’ve learned is that courage doesn’t come from size. It comes from trusting God.", "Could you help me? I need five smooth stones from the brook."], steps: ["Collect 5 smooth stones along the brook", "Deliver the stones to David"], outro: ["Five smooth stones. Exactly what I needed. Thank you.", "Being brave doesn’t mean you never feel afraid.", "It means you trust God, even when you do."], done: ["God looks at the heart, not at how strong someone appears."], remind: "Search the sandy bank of the brook. The stones catch the light." },
    moses: { intro: ["Greetings. My name is Moses.", "Public speaking was always difficult for me. When God called me, I protested that I was slow of speech.", "God’s answer was simple: “I will be with your mouth.” And He was, every time.", "At the summit of this mountain, there is something important. Will you climb up and bring down the stone tablets?"], steps: ["Climb to the summit of Mount Sinai", "Retrieve the stone tablets", "Carry the tablets down to Moses"], outro: ["You made the climb. Thank you for your persistence.", "God’s commandments show us how to love Him and how to love one another.", "His Word is like a lamp that shows the right path."], done: ["God often chooses unlikely people and gives them what they need for the task."], remind: "Keep ascending. The summit is capped with snow." },
    samaritan: { intro: ["(Jesus once told a story to answer the question, “Who is my neighbour?”)", "Please, can you help me? I was hurt, and I can’t walk.", "A priest saw me and passed by on the other side. Then another man did the same."], choice: { prompt: "What will you do?", options: [{ text: "Keep walking. Someone else will handle it." }, { text: "Wish him well, then leave." }, { text: "Stop and help him." }] }, steps: ["Draw a jar of water from the village well", "Find bandages inside the inn", "Bring the supplies to the injured traveler"], outro: ["That’s so much better. Thank you for stopping.", "Jesus said a true neighbor is the one who shows mercy.", "Today, that was you."], done: ["Others walked past, but you stopped. That made all the difference."], remind: "Follow the arrow to the well and the inn." },
    loaves: { intro: ["Hi, I’m Andrew, one of Jesus’ disciples.", "Thousands of people came to hear Him teach, and now they’re hungry, with nowhere nearby to buy food.", "Jesus asked how we could possibly feed everyone. Then I noticed your lunch:", "Five little loaves of bread and two fish."], choice: { prompt: "Will you share your lunch?", options: [{ text: "No. It’s mine, and it won’t help anyway." }, { text: "Yes. Jesus can have it." }] }, steps: ["Distribute bread to 3 hungry villagers", "Report back to Andrew"], outro: ["Everyone ate until they were satisfied, and there were twelve baskets of leftovers.", "God can do far more with what we offer than we can imagine."], done: ["God loves a cheerful giver. Thanks for sharing."], remind: "Look for villagers with a bread icon above them." },
    joseph: { intro: ["Welcome. I’m Joseph.", "Years ago, my brothers were jealous of me, and they sold me to traders bound for Egypt.", "Those were hard years, but God never left me.", "Now I help lead Egypt, and I stored grain before this famine. My brothers have just arrived asking for food, and they don’t recognize me."], choice: { prompt: "What should Joseph do?", options: [{ text: "Turn them away. They deserve it." }, { text: "Forgive them and provide food." }] }, steps: ["Collect 3 sacks of grain from the storehouse", "Give grain to each of your 3 brothers", "Return to Joseph"], outro: ["We embraced, and the tears were happy ones. My family is together again.", "God took what was meant for harm and used it for good."], done: ["Forgiveness didn’t erase the past, but it set my heart free."], remind: "The storehouse is the brick building in the desert." },
    honesty: { intro: ["(Earlier, while you were building, you accidentally knocked a hole in Micah’s fence.)", "Oh no. There’s a hole in my fence, and one of my sheep has wandered off.", "Do you know how this happened?"], choice: { prompt: "What will you say?", options: [{ text: "No idea. Maybe the wind did it." }, { text: "Your sheep probably knocked it down." }, { text: "It was me. I’m sorry. I’ll help fix it." }] }, steps: ["Find the lost sheep and guide it back to the pen", "Repair the fence: place 6 blocks in the glowing gap", "Talk to Micah"], outro: ["The fence is solid again, and my sheep is safe.", "Honestly, I trust you more now, because you told me the truth."], done: ["Honesty is what makes a friendship strong."], remind: "Follow the arrow and take your time." },
  },
};
const QUEST_BASE = JSON.parse(JSON.stringify(Object.fromEntries(Object.entries(QUESTS).map(([k, q]) => [k, { intro: q.intro, outro: q.outro, done: q.done, remind: q.remind, steps: q.steps.map(s => s.text), options: q.choice ? q.choice.options.map(o => o.text) : null }]))));
// Swap mission text in place for the child's reading level ('k' | 'base' | 'adv')
export function applyMissionTier(tier) {
  for (const [id, Q] of Object.entries(QUESTS)) {
    const b = QUEST_BASE[id], o = (QUEST_TIERS[tier] || {})[id] || {};
    Q.intro = o.intro || b.intro; Q.outro = o.outro || b.outro; Q.done = o.done || b.done; Q.remind = o.remind || b.remind;
    Q.steps.forEach((s, i) => { s.text = (o.steps && o.steps[i]) || b.steps[i]; });
    if (Q.choice) Q.choice.options.forEach((opt, i) => { opt.text = (o.choice && o.choice.options[i] && o.choice.options[i].text) || b.options[i]; });
  }
}
