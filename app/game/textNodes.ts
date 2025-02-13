export interface Option {
  text: string;
  nextScene: number;
}

export interface Scene {
  id: number;
  prefix: string;
  text: string;
  suffix: string;
  author: string;
  options: Option[];
}

export const Scenes: Scene[] = [
  {
    id: 0,
    prefix: "",
    text: `Title Screen`,
    suffix: "",
    author: "",
    options: [
      { text: `Start Game`, nextScene: 1 },
    ],
  },
  {
    id: 1,
    prefix: "",
    text: `
Jun had never particularly liked cherry blossoms.

It couldn’t be described as dislike, much less hatred. Yet it went beyond mere indifference. No, they made him *uncomfortable.* The memories of pink petals floating down a stream’s rushing waters; petals his toddler’s arms thought they could reach, a stream his older sister had to frantically fish him out from, water whose temperature belied the brightness of the spring sun. It gave him shivers, the thought alone. His love for Japanese literature didn’t help matters. Cherry blossoms, they were fleeting and impermanent.

Right now, however, the coordinate in time and space he inhabited felt anything but.

*Sakura...Hana.*

It was strange how the universe drew him and Koide-san close together, given that she spent as much time on the sports field as he did off it. An injury could hardly be described as cosmic luck ; indeed, it felt almost rude to think of it as such. Nevertheless, it did result in her spending quite some time by his side — in the neighbouring seat in the front row (to accommodate her bandaged leg), in the classroom during PE when everyone else had gone off to play (as different as their reasons might have been), on the patio of her home (he had been tasked with delivering her handouts).

All those occasions had their reasons, but Jun couldn’t think of one for the message she sent him.

*Meet me under the big cherry blossom tree. Wait for me there. Don’t be late.*

*Don’t be late.*

*...I’m gonna be late.*
Hana Koide’s prowess as a fielder and batter stemmed from her running. She’d always been good at it; it was her reputation as a speedy child that eventually led her down the athletic path after all. Right now, however, she was on what felt like the longest mile of her life.

“No running in the hallway!”

A ridiculous rule that made zero sense. Not that she’d voice that thought. “Sorry sensei, I’ll be more careful.”

More careful in choosing her path, perhaps. As she pivoted away from the main hallway and started briskly walking in the general direction of the gym (and its backdoor), the thought of the cherry blossom tree she was headed towards conjured up a delicate shade of pink; it entered her mind, and then suffused her cheeks. She couldn’t put a finger on when Jun began to dominate her thoughts. Was it when she continued sitting in the front row long after her leg healed, just so she could hear his soft, measured voice read out poetry in Japanese class? Was it when she took her time returning to baseball, just to spend a few more PE classes in his company? Or was it when she expectantly waited for his delivery of class handouts on her doorstep, snacks in one hand? (She pretended to have bought all those onigiri and cookies from a convenience store; she had, in fact, made them herself, but would certainly never admit to it.)

The delicate pink gave way to a blooming redness. *Gosh, how embarrassing.* This was so unlike her that her only way of dealing with it was to pretend like it wasn’t the case, like she hadn’t fallen for him hard. This had the unintended yet thoroughly expected result of Jun never realising the depth of her feelings for him. A recurring instance in her life; quite tragic, quite comical. Today, however, she was determined to come clean and firmly grasp her happy ending. She balled up her fists as she ran down the hallway, now that she’d entered a more deserted part of school. Today was her day, and no one could stand in her way.

Or could they?

A tall, slender, and unfortunately familiar figure stood by the backdoor. It turned to regard her, a raised eyebrow the only indicator of surprise on an otherwise expressionless visage. 

“Hana-tan.”

*Of course. Who else? Am I even surprised at this point?* “I’ve lost count of how many times I’ve told you not to call me that, Reina-*san*.” A theatre of emotions played across Hana’s face. She never got along with these theatre kids. Too *artsy.* Too artful, in this case. She never knew what Reina was up to behind her mask.

A ghost of a smile breached the wall of Reina’s face. *Kinda scary.* “I see. Apologies.”

Hana scoffed. “About time.”

“I never said the apology was for you, now did I?”

The scoff turned to scowl. This was an undoubtedly juvenile bit of horseplay, but Hana could never rein herself in when it came to these barbs; they always spurred her on. “Ugh, why are you even here? You don’t even visit the gym. Not that you could lift a water bottle even if you did.” A weak attempt, but she didn’t want to let that slide.

The ghostly smile didn’t leave Reina’s face. *Kinda annoying.* “That is true, yes. I’m somewhat like Jun in that regard.”

The blood rushing to Hana’s head all of a sudden rushed to her face instead. “Eh, wha...who?”

“You spend half your waking hours with someone you don’t know?”

“No that’s, that’s not what I meant! I just didn’t know you knew J— er, Aonuma-kun that well.”

Reina nodded. “Jun-Jun helps write scripts for us from time to time. He has a way with words.”

Hana probably looked like a ripe tomato at that moment. She wanted nothing more than to be crushed and turned to sauce. *Kill me now.* “T-the way with words is all yours, with those ridiculous names!”

Reina’s smile only deepened. *Kill me now, already.* “You don’t seem to like my little names. How sad.”

Hana looked for an out. This conversation was getting derailed, and more importantly so was her plan to confess to Jun. She certainly did not have a way with words, and would only blurt out more defensive silliness the longer she remained under siege.
    `,
    suffix: "",
    author: "",
    options: [
      { text: `Reina leaves Hana feeling unsure of herself; Hana turns back the way she came.`, nextScene: 3 },
      { text: `Hana walks past Reina`, nextScene: 4 },
      { text: `Hana decides to confront Reina over it`, nextScene: 12 },
    ],
  },
  {
    id: 2,
    prefix: "",
    text: `
Jun waved at an approaching Hana. He stood beneath the old cherry tree, shifting his weight from one foot to the other. His palms were sweaty, and he kept glancing at his watch, though he already knew the time. Hana had called him out here—but why? Had he done something wrong? Did she need a favor? Or worse… was this some kind of prank?

His mind raced through every possible scenario, each one more disastrous than the last. He could already hear her voice calling him an idiot, scolding him for something he didn’t even realize he had done. He tugged at his sleeves, rubbing the fabric between his fingers, trying to steady his nerves.

Hana stormed across the schoolyard, her ponytail swinging behind her like an exclamation mark of rage. Jun immediately straightened up, forcing a shaky smile. He raised a hand to wave — then quickly dropped it when he saw the look on her face.

"Hana?" he asked, voice cautious.

She stopped a few steps away, glaring at him, but not saying a word.

Jun shuffled awkwardly, fidgeting. "Uh… you called me here, right? Did something happen?"

Something happened, all right. She had spent the entire night rehearsing what she wanted to say, only for her brain to betray her the second she saw his face. Stupid, stupid, stupid!

She groaned, running a hand through her hair. "Forget it," she muttered, turning to leave.

"W-wait!" Jun blurted, panicking. "Did I do something wrong? If it's about the lunch incident, I swear I didn’t mean to—"

"Shut up!" she snapped, whirling around. She reached into her pocket, pulled out a crumpled piece of paper, and shoved it into his hand.

Jun blinked down at it. "What’s this?"

"Your problem now," she huffed, before spinning on her heel and marching away, her face burning.

Jun stared at her retreating figure, then at the note in his hand.

It had one word on it.

‘Idiot.’ 
    `,
    suffix: `
Jun stared at the paper. A little perplexed, a little lost. What on Earth?...

He looked up and saw that Hana had
    `,
    author: "Raj",
    options: [
      { text: `Walked away.`, nextScene: 6 },
      { text: `Ran away.`, nextScene: 5 },
      { text: `Began to tear up.`, nextScene: 8 },
    ],
  },
  {
    id: 3,
    prefix: "Hana hightails and runs. Reina shouts after her, “Oi!-” But whatever she was saying is lost in the wind. Hana slows her sprint into a jog and then finally comes to a stop.",
    text: `
Hana kicked a stray pebble, the click echoing through the empty schoolyard. Lost. Utterly, hopelessly lost. Why did Reina always have to be so… Reina? Always there, a glint in her eye and a barbed comment on her tongue. "Hana, still struggling with basic equations?" Or, "That skirt's a little short, don't you think?" It wasn't the words themselves, but the way Reina's lips curved when she said them, like she was privy to some inside joke Hana wasn't in on.

Hana scowled, shoving her hands deeper into her pockets. She was supposed to be meeting. Instead, she'd somehow wandered behind the gym, a place she hadn't been since freshman year. Stupid Reina, messing with her head. "She probably just wants to get a rise out of you," Hana muttered to herself, trying to reassure herself, but her voice wavered. Why did Reina bother? What was her problem? 

Hana rounded the corner of the building and bumped straight into something… soft?
`,
    suffix: "Hana stumbles back slightly. “Ah! Hana, I’m so sorry! Are you okay?” Hana looks up to see Jun’s worried face staring at her.",
    author: "Echo",
    options: [
      { text: `Hana gets nervous.`, nextScene: 7 },
      { text: `Hana gets flustered.`, nextScene: 8 },
    ],
  },
  {
    id: 4,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 9 },
      { text: `Option 2`, nextScene: 2 },
    ],
  },
  {
    id: 5,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 28 },
      { text: `Option 2`, nextScene: 3 },
    ],
  },
  {
    id: 6,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 102 },
      { text: `Option 2`, nextScene: 101 },
    ],
  },
  {
    id: 7,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 102 },
      { text: `Option 2`, nextScene: 11 },
    ],
  },
  {
    id: 8,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 10 },
      { text: `Option 2`, nextScene: 101 },
    ],
  },
  {
    id: 9,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 12 },
      { text: `Option 2`, nextScene: 10 },
      { text: `Option 3`, nextScene: 28 },
    ],
  },
  {
    id: 10,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 11 },
      { text: `Option 2`, nextScene: 27 },
      { text: `Option 3`, nextScene: 21 },
    ],
  },
  {
    id: 11,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 104 },
      { text: `Option 2`, nextScene: 103 },
    ],
  },
  {
    id: 12,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 13 },
      { text: `Option 2`, nextScene: 14 },
    ],
  },
  {
    id: 13,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 2 },
      { text: `Option 2`, nextScene: 6 },
    ],
  },
  {
    id: 14,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 15 },
      { text: `Option 2`, nextScene: 16 },
    ],
  },
  {
    id: 15,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 16 },
      { text: `Option 2`, nextScene: 17 },
    ],
  },
  {
    id: 16,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 104 },
      { text: `Option 2`, nextScene: 18 },
    ],
  },
  {
    id: 17,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 18 },
      { text: `Option 2`, nextScene: 20 },
    ],
  },
  {
    id: 18,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 19 },
      { text: `Option 2`, nextScene: 20 },
    ],
  },
  {
    id: 19,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 21 },
      { text: `Option 2`, nextScene: 22 },
    ],
  },
  {
    id: 20,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 23 },
      { text: `Option 2`, nextScene: 24 },
    ],
  },
  {
    id: 21,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 102 },
      { text: `Option 2`, nextScene: 25 },
    ],
  },
  {
    id: 22,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 26 },
      { text: `Option 2`, nextScene: 101 },
    ],
  },
  {
    id: 23,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 102 },
      { text: `Option 2`, nextScene: 101 },
    ],
  },
  {
    id: 24,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 102 },
      { text: `Option 2`, nextScene: 22 },
    ],
  },
  {
    id: 25,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 104 },
      { text: `Option 2`, nextScene: 103 },
    ],
  },
  {
    id: 26,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 101 },
      { text: `Option 2`, nextScene: 102 },
    ],
  },
  {
    id: 27,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 102 },
      { text: `Option 2`, nextScene: 101 },
    ],
  },
  {
    id: 28,
    prefix: "",
    text: `Passage`,
    suffix: "",
    author: "",
    options: [
      { text: `Option 1`, nextScene: 17 },
      { text: `Option 2`, nextScene: 104 },
    ],
  },
  {
    id: 101,
    prefix: "",
    text: `Happy ending (medha): “A Love Fulfilled”`,
    suffix: "",
    author: "",
    options: [
      { text: `Play Again`, nextScene: 0 },
    ],
  },
  {
    id: 102,
    prefix: "",
    text: `Awkward ending (medha): “A Love Unspoken” `,
    suffix: "",
    author: "",
    options: [
      { text: `Play Again`, nextScene: 0 },
    ],
  },
  {
    id: 103,
    prefix: "",
    text: `Twist ending (Manas): “An Unexpected Love” `,
    suffix: "",
    author: "",
    options: [
      { text: `Play Again`, nextScene: 0 },
    ],
  },
  {
    id: 104,
    prefix: "",
    text: `Rival ending (Manas): “A Love That Got Away”`,
    suffix: "",
    author: "",
    options: [
      { text: `Play Again`, nextScene: 0 },
    ],
  },
];
