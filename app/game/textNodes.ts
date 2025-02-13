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
    prefix: ``,
    text: `Title Screen`,
    suffix: ``,
    author: ``,
    options: [
      { text: `Start Game`, nextScene: 1 },
    ],
  },
  {
    id: 1,
    prefix: ``,
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
    suffix: ``,
    author: ``,
    options: [
      { text: `Reina leaves Hana feeling unsure of herself; Hana turns back the way she came.`, nextScene: 3 },
      { text: `Hana walks past Reina`, nextScene: 4 },
      { text: `Hana decides to confront Reina over it`, nextScene: 12 },
    ],
  },
  {
    id: 2,
    prefix: ``,
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
    prefix: `Hana hightails and runs. Reina shouts after her, “Oi!-” But whatever she was saying is lost in the wind. Hana slows her sprint into a jog and then finally comes to a stop.`,
    text: `
Hana kicked a stray pebble, the click echoing through the empty schoolyard. Lost. Utterly, hopelessly lost. Why did Reina always have to be so… Reina? Always there, a glint in her eye and a barbed comment on her tongue. "Hana, still struggling with basic equations?" Or, "That skirt's a little short, don't you think?" It wasn't the words themselves, but the way Reina's lips curved when she said them, like she was privy to some inside joke Hana wasn't in on.

Hana scowled, shoving her hands deeper into her pockets. She was supposed to be meeting. Instead, she'd somehow wandered behind the gym, a place she hadn't been since freshman year. Stupid Reina, messing with her head. "She probably just wants to get a rise out of you," Hana muttered to herself, trying to reassure herself, but her voice wavered. Why did Reina bother? What was her problem? 

Hana rounded the corner of the building and bumped straight into something… soft?
`,
    suffix: `Hana stumbles back slightly. “Ah! Hana, I’m so sorry! Are you okay?” Hana looks up to see Jun’s worried face staring at her.`,
    author: "Echo",
    options: [
      { text: `Hana gets nervous.`, nextScene: 7 },
      { text: `Hana gets flustered.`, nextScene: 8 },
    ],
  },
  {
    id: 4,
    prefix: ``,
    text: `
Reina stepped in front of Hana just as she was about to slip past herl, arms crossed and a smirk playing on her lips. “Where do you think you’re going?” she asked, voice laced with amusement.  

Hana barely spared her a glance. “None of your business,” she muttered, brushing past.  

Reina easily fell into step beside her. “Oh? Then why are you in such a hurry?”  

Hana’s shoulders tensed. She didn’t have time for this—not now. “I just have things to do.”  

Reina let out a knowing hum. “Things, huh? You wouldn’t happen to be meeting Jun, would you?”  

Hana faltered, her breath hitching for just a second before she scowled. “Why do you care?” she snapped, quickening her pace. “It’s not like it concerns you.”  

Reina’s smirk widened. “Oh, but it does. Watching you squirm is the highlight of my day.”  

Hana’s face burned. “You’re insufferable.”  

“I try,” Reina said breezily, but there was something in her tone—something unreadable. 
    `,
    suffix: `Hana took a deep breath and turned to face Reina.`,
    author: `Kushal Savit Choudhary`,
    options: [
      { text: `“I can’t be even half as insufferable as you are.” Hana turns.`, nextScene: 9 },
      { text: `“Maybe you’re the real insufferable one.” Hana leaves.`, nextScene: 2 },
    ],
  },
  {
    id: 5,
    prefix: ``,
    text: `
(Hana walks down the road. Hana is absolutely clueless on what to do and sees a shadow in front)

Hana looks slowly looks up trying to think Sane x

Riena : Hey Hana, How are you (with a slight tremor in her voice)

Hana : Riena hey! I'm fine... How are you ( trying to bring herself back)

Riena : I'm fine. I wanted to talk to you about something..

Hana : About what!? 

Riena : About what happened earlier...

Hana : what Happened? Can we talk later I gotta go

Riena : Come on Hana!! You know what I'm talking about 

Hana : We can talk later, Riena! I'm busy right now

Hana tries to walk away 

Riena holds her hand. Hana Looks up at Riena, surprised and slightly shocked. Riena realising what she has done leaves her hand. 
    `,
    suffix: `Hana decides that the best course of action now would be`,
    author: `Enigma`,
    options: [
      { text: `Fight`, nextScene: 28 },
      { text: `Flight`, nextScene: 3 },
    ],
  },
  {
    id: 6,
    prefix: ``,
    text: `
Hana turns and  leaves flustered and perturbed after that botched confession. She wasn't even able to get her feelings across. Jun follows after her. He catches her and steels himself. “Actually, Hana-” he starts, “The truth is… I… I didn’t completely- I mean, but… the thing is….”

Jun, visibly nervous, his palms were sweaty, knees weak, arms are heavy due to the nervous state he’s in. “And? And what? What did you want to say?” Hana asks in a soft, yet grumpy tone, turning around to face him, anxious about his response.

“I am not the best at framing words Hana, though you know that by now. So, I uh… I do not know what to say to you when it comes to something like this either.” Jun replies, his voice breaking due to the overwhelming tension between them. Hana pulls away from him, breaking free from his grip, her eyes swelling up with tears. She turns around and walks away, afraid to hear the next words coming out of Jun out of fear of her imminent rejection.

“Wait hold on…” Jun says, trying to grab her again. “If you’re gonna reject me then don’t!! At least let me prepare myself for it” Hana says in a loud sharp tone, her eyes tearing up. “That’s not what I was going to do Hana” Jun screams at the top of his lungs, shocking Hana. “Then what?” Hana asks, as she stops walking away, “What were you gonna say…..?” 
    `,
    suffix: `Jun hesitantly reaches out a hand. Hana doesn’t stop him when their fingers touch. He slowly grasps her hand in his.`,
    author: `Anemo`,
    options: [
      { text: `Jun leads Hana by the hand to the blossom tree.`, nextScene: 102 },
      { text: `Hana timidly leads Jun to the blossom tree.`, nextScene: 101 },
    ],
  },
  {
    id: 7,
    prefix: `Hana stammers out, “It’s not like an idiot like you would get why it-”`,
    text: `
The words had barely left her mouth before Hana’s stomach twisted with regret. That wasn’t how she’d meant to say it. That wasn’t how it was supposed to go at all.

A second passed. Then another. Jun just stood there, staring at her with wide, stunned eyes. His fingers twitched at his sides like he wanted to grab onto something. Or maybe — maybe he wanted to grab onto her.

No. No, no, no. She couldn't stand here and watch this moment stretch into something unbearable. Heat crawled up her neck, pooling behind her ears, and before she could think better of it, her feet were already moving. “Forget it,” she muttered, turning on her heel. “Just—forget I said anything.”

She barely made it two steps before a hand shot out, hesitating just before touching her sleeve.

“Hana, wait.”

His voice was quiet. Pleading.

It only made her chest tighten worse.

“Don’t,” she snapped, wrenching her arm away before he could make the mistake of holding on.

Jun flinched, recoiling as if she’d struck him. His gaze flickered downward, shoulders curling in like she’d just confirmed whatever fear had been gnawing at him.

Hana’s throat went dry.

She hadn’t meant — she just —

Her fists clenched.
    `,
    suffix: ``,
    author: `Royale von akraman`,
    options: [
      { text: `Hana tries to push through with her confession despite the tense atmosphere`, nextScene: 102 },
      { text: `Hana runs away`, nextScene: 11 },
    ],
  },
  {
    id: 8,
    prefix: `Jun could understand Hana was flustered. Something had happened. He knew he had to say something. Do something. Jun could only imagine if he was stronger, more assertive. Maybe things would be a little different. Jun could even envision it now.`,
    text: `It had been a long day for Jun, he had spent most of it anxiously awaiting the school bell. The moment it rang he bolted towards the Sakura tree behind the school, today was the day Hana chan had asked him to meet her there. He knew that the tree was a well known confession spot in the school. “Hana wouldn’t really be interested in someone like me would she? She must have called me here to ask for a favour or maybe borrow my homework right?” thought Jun, but yet deep inside a part of him yearned to be proven wrong. As he arrived at the tree he found the area deserted. He was thankful that he wouldn’t have an audience to whatever was going to take place. He sat down underneath the tree and decided to wait for her. He kept waiting and waiting and waiting, an hour passed by and then another. He finally got up with a sigh, very sure that he had been stood up. Right as he was about to leave, he saw Hana slowly walking towards him. His heart skipped a beat. Just as he was about to cheerfully call out to her, he noticed her disheveled appearance. Her eyes were puffy as though she had just been crying and she looked exhausted. “You actually waited for me?” said Hana quietly as she looked up and saw Jun. “Of course I did, you asked me to” replied Jun awkwardly. Gathering up his courage and clearly worried for her he said “You don’t look so good is everything ok?”. “Yes….Um actually no” stammered Hana. “I just wanted to give you something I made but I dropped it. I then spent the last 2 hours trying to remake it in the home science classroom but failed at that too. Looks like I can’t do anything right” said Hana gloomily. Jun then noticed the brown batter stains on his uniform. “Did she just try to make me a chocolate cake because I happened to mention that it’s my fav flavour in passing last week?” thought Jun to himself as his heart fluttered. “Never say that about yourself, you are the coolest, most determined and nicest person I’ve ever met” said Jun as he scooped some of the cake batter off of her shirt. “This is delicious! Please tell me you haven’t thrown away whatever u tried to make yet!?” exclaimed Jun as he licked his finger. “My misshapen semi baked cake is still sitting in the home science room….How could u even like it?” exclaimed Hana as her face turned beet red. “No more questions and self doubt, we are going to the home science room to have the rest of your amazing cake!” said Jun assertively as he grabbed Hana’s hand and gently led her towards the classroom. They then spent the next hour eating half baked chocolate cake and just talking about all the funny incidents they had seen in school. When it was time to leave, they bid each other farewell and separated. Jun was surprised at the uncharacteristic confidence he had shown today but was happy for it. He felt he was finally a little closer to Hana.`,
    suffix: `Jun shook his head. What on Earth? Hana is standing in front of him and what is he imagining in his own world? Jun took a deep breath. Jun should,`,
    author: `Shreyas`,
    options: [
      { text: `Talk to her`, nextScene: 10 },
      { text: `Try and hold her hand`, nextScene: 101 },
    ],
  },
  {
    id: 9,
    prefix: `Reina tugs Hana to the side, glaring.`,
    text: `
“You...!” Reina hissed, her voice low but sharp. Her glare could cut glass.

“What is your problem?” Hana snapped, yanking her hand free, defiant despite her flustered expression.

“You’re my problem,” Reina spat. “Watching you trip over yourself like some clueless idiot every time Jun shows up is the most infuriating thing I’ve ever seen.”

Hana’s face darkened. “If you’re so bothered, why don’t you look away?”

“Maybe I would if it weren’t so pathetic,” Reina shot back. “He’s not a mind reader, Hana. Either speak up or stop staring like he’s a limited-edition collectible you can’t afford.”

Silence thickened between them, the air electric.

“Why do you care so much?” Hana demanded, eyes narrowing.

Reina faltered, lips parting without a response. Frustration knotted in her chest.

“…Just forget it,” she muttered, turning on her heel. But the heat in her cheeks betrayed her resolve.

Reina's footsteps echoed as she stormed away, heart thudding louder with every step. Her fingers clenched into fists, nails biting into her palms. Why did Hana have to look at her like that — like she'd just uncovered something Reina herself hadn’t fully figured out?

The crisp air stung her face, but it did nothing to cool the fire burning beneath her skin. It wasn’t just Hana’s cluelessness about Jun that grated on her nerves; it was something deeper, something Reina didn’t want to admit even to herself.

“Wait.”

Hana’s voice, sharp but uncertain, cut through the noise of her thoughts. Reina stopped in her tracks, reluctantly turning halfway.

“What now?” she snapped, her tone harsher than intended.

Hana stood firm, jaw set despite the faint flush on her cheeks. “You don’t get to just say all that and walk away like it’s nothing.”

Reina’s lips curled into a bitter smirk. “What are you gonna do about it?”

Hana crossed her arms, her gaze unwavering. “Maybe nothing. But you’re acting weird, and it’s annoying.”

Reina laughed — short, humorless. “You’re one to talk.”

They stared at each other, the tension crackling between them like static.

For a fleeting moment, Reina considered saying something honest. But instead, she sighs. “Don’t waste my advice, Hana,” she smirks “Even if you’re too stubborn to thank me for it.”    
    `,
    suffix: `Hana feels fury boiling in her chest.`,
    author: `hikari`,
    options: [
      { text: `Hana decides to try and talk things out with Reina`, nextScene: 28 },
      { text: `Hana ignores her and goes to Jun`, nextScene: 10 },
    ],
  },
  {
    id: 10,
    prefix: `Hana stands before Jun at the cherry blossom tree.`,
    text: `
The cherry blossoms floated gently in the breeze as Jun stood awkwardly under the tree, fidgeting with his sleeves. Jun’s stomach twisted. He wasn’t prepared for this.

“H-Hana, um… is everything okay?” he asked hesitantly.

She huffed. “Why do you care?”

Jun panicked. “Oh! N-no reason! I mean, obviously I do care, but not in a weird way! Just, you know, in a normal, concerned-friend way!”

Hana’s eye twitched. “Jun. Can you cut to the chase?”

“I, um… I don’t know if it’s okay to ask you this,” he stammered, avoiding her gaze. “You have a lot of friends, so I’m sure you’re already in a group. But I thought I’d ask you anyway, since I don’t think anyone else will join me. It’s totally okay if you say no, though! I won’t mind at all. I just—”

Hana cut him off. “Are you serious? Under the cherry blossom tree of all places, is where you want to ask if I wanted to do the group project with you?!!!!”

“I know this isn’t the best place to ask,” Jun said, scratching the back of his neck, “but I thought it’d be weird to ask in front of your friends in class. So, uh, I figured I’d ask you here as it's generally empty.”

Hana opened her mouth to rebuke him again, but just then, a cherry blossom petal floated down and landed directly on his nose. He tried to hold it in, but he couldn’t stop the sneeze. “Hakushon!”    
    `,
    suffix: `Hana looks at Jun with a blank expression. She decides to`,
    author: `Debarka`,
    options: [
      { text: `Turn away`, nextScene: 11 },
      { text: `Stay and continue to listen`, nextScene: 27 },
      { text: `Try and interrupt him`, nextScene: 21 },
    ],
  },
  {
    id: 11,
    prefix: `Hana runs with all her might. Just what was she doing? Reina sees Hana rush past.`,
    text: `
Reina follows Hana down the hallway and her footsteps are heard very loudly. She catches up to Hana and with a strong voice says. “You just left him there.”

Hana turning around aggressively.... “So what?”

Reina very upset/annoyed and understanding of Jun. “Jun was trying to talk to you. For once, he was being hones....trying to reach you. And you just???” She exhaled sharply. “Do you even know how much that hurt him?”

Hana very annoyed herself, as though she isn't responsible for hurting Jun. “Tch. It’s not my fault if he gets his feelings hurt”

Reina crossing her arms. “You don’t get it at all, do you?”

Hana laughs. “Oh, please. Do you think you understand him better than I do?”

“Obviously I do which is why I am here, don't you think what you did was unfair??” Reina shot back.... “At least I listen”

Hana started to feel a rumble in her chest, but ignoring it she said “I never asked him to....” She stopped herself. The words felt wrong to her

Reina looking at her realised, then sighing said “You’re scared, aren’t you?”

Hana flustered tell her to “Shut up”

Reina nodding her head. “You act tough, but when it actually matters, you don't have what it takes to confront him and what he is saying. Jun deserves better than that.....” making an angry face

Hana clenching her fist. “…I never said he didn’t.” Her voice was quiet, she had nothing more to say

Reina hesitated. But before she could say anything, Hana turned away.    
    `,
    suffix: `Hana sighs, her shoulders slumped. She turns to face Reina.`,
    author: `Rahul`,
    options: [
      { text: `“I guess you understand him better…”`, nextScene: 104 },
      { text: `“I guess I don’t understand him at all, but... I think I’m starting to understand you.”`, nextScene: 103 },
    ],
  },
  {
    id: 12,
    prefix: `Unaware of whatever is happening between Hana and Reina, Jun waits alone under the tree. He’s getting nervous. Being hopelessly inexperienced in these matters, he picks up his phone to text someone for advice. But who can he turn to at a time like this?`,
    text: `
Jun slowly looked at his phone. Just a home screen. Jun’s thumb finger is resting on the bottom of the home screen as if he is about to touch some of the bottom-row apps there. Jun looked at his surroundings. A cool breeze is touching Jun’s body. Jun continued to look at his surroundings. The place is filled with so many cherry blossom trees. The petals are falling slowly and moving with the wind. It is the start of the new semester. Jun was used to his old school very much, he is about to start his new life here, but Jun isn’t feeling comfortable here. Jun is feeling out of place here, he just needs someone to support him. He opened the recent calls; calls with his sister and his childhood friends are in the top list and filled the entire screen. Jun tried to text his sister about the situation here. The text is still empty. Jun thought in his mind “I don’t think it will work”. Jun pressed back and now the contact list is there. Jun started a text with his childhood friend. Jun typed “I need your help”.    
    `,
    suffix: `Jun backspaced again. He stared at his phone, the text box as blank as his mind. In a moment like this, who can he even reach out to?`,
    author: `vicky vishnu`,
    options: [
      { text: `His friend`, nextScene: 13 },
      { text: `His older sister`, nextScene: 14 },
    ],
  },
  {
    id: 13,
    prefix: ``,
    text: `
Jun sat hunched on the edge of a splintering bench, his phone trembling slightly between his fingers. The message glared back at him with sterile reassurance: "Hana isn’t the type to stand you up. You have a chance." Words typed with casual confidence by someone unburdened by the oppressive machinery of doubt, someone oblivious to the churning gears within Jun’s chest.

He inhaled sharply, as though the message contained air, not letters. A fleeting surge of relief rose within him, fragile and artificial, like a paper lantern adrift in a void indifferent to light. Even as he slid his phone into his pocket, the phantom of comfort retreated, leaving behind the residue of gnawing anxiety—an existential rot thriving in the sterile absence of true reassurance. "Man is sometimes extraordinarily, passionately, in love with suffering," Dostoevsky's words flickered uninvited in his mind, a cruel reflection of his own restless turmoil.

And then he saw her.

Hana emerged from the amorphous crowd, her figure distinct yet spectral, as though carved from the very fabric of his own delirium. Jun's heart convulsed with an irregular rhythm, an arrhythmic pulse both intimately his and entirely alien. His thoughts splintered, fragments crashing into each other with cruel precision: Was she smiling out of obligation? Did her steps falter because she regretted coming? The ground beneath him became treacherous, thin ice over an abyss of self-recrimination, threatening to collapse under the weight of his own existence.

His limbs grew heavier with each step she took closer, as if the very air had conspired to betray him, thick and oppressive. The world did not narrow in focus on Hana; instead, it expanded grotesquely, every detail magnified to an unbearable clarity—the scraping of a shoe against concrete, the metallic cough of a distant car, the suffocating awareness of his own inadequacy—all woven into the tapestry of his unraveling composure. Reality itself seemed to mock him, an indifferent stage upon which his frailty was exposed, echoing Kafka's lament: "I am a cage, in search of a bird."

And still, she walked toward him, indifferent to the maelstrom she conjured within the fragile edifice of his mind.    
    `,
    suffix: ``,
    author: `C`,
    options: [
      { text: `Jun waves casually at Hana`, nextScene: 2 },
      { text: `Jun walks towards Hana but falls flat on his face`, nextScene: 6 },
    ],
  },
  {
    id: 14,
    prefix: ``,
    text: `
Jun walked away from the tree, disappointed. His sister was right. Hana would not have been so late if she really meant to meet him. He walks a few yards before he notices a figure leaning against the school building, Reina was leaning against a wall, deep in thought. She caught sight of him and perked up.

"Oh, Jun-kun!"

"Hey." Jun would normally be happy to see Reina, but he was forlorn over being stood up. Reina sauntered over, studying his expression with a finger on her chin.

"What do we have here? Does the lover boy have troubles?"

"Don't call me that." Jun gave a weak laugh.

Reina put her hands over his cheeks, making him face her directly. Jun flinched at the sudden contact. Her hands were warm. 

"You were waiting for Hana, weren't you?"

Jun nodded solemnly. "Yeah, I was."

Reina spoke while lightly shaking him. "It's fine. Jun-kun is trying his best. Give it your all, and in the end, if you figure out she's not the one? That's still going to strengthen your heart."

Jun held her hands. "But I feel so weak."

"I know what it's like to have an unrequited love. You're being so strong right now."

"You do? How could a popular girl like you ever have an unrequited love?"

"How indeed." Reina pulled her hands away and looked down. "It's not something that bothers me anymore. Because I have more confidence now." She faced him again, smiling warmly. "If your heart breaks from yearning, I will be there to mend it."

"What?"    
    `,
    suffix: `Reina giggled.`,
    author: `Can't wait for them to tone down the random encounter rate a second time and still have it be too damn high`,
    options: [
      { text: `Reina teases Jun about waiting`, nextScene: 15 },
      { text: `Reina offers Jun some unexpected advice`, nextScene: 16 },
    ],
  },
  {
    id: 15,
    prefix: ``,
    text: `
Jun kept checking his watch at regular intervals, and kept adjusting his glasses, as the soft pink petals of cherry blossoms floated around him. He sighed and turned to leave. “I should get going, Reina.”

Reina smirked, “So it finally hit you that she isn't coming.”

“Wha..” Jun corrected his glasses “What do you mean?”

“I mean- obviously she was never gonna come.”

“But Hana's the one who called me.”

“Maybe she forgot. You're just a teeny tiny part of her life.”

“No... Not true. I'm.. I'm important to her.”

“Says who?” Reina laughed.

Jun tried to walk away.

Reina followed behind him “Wait.”

Jun turned back. “You're right. I should wait a bit longer.”

“I meant to wait for me too. Don't just leave me here. Now keep walking dumbass.”

Jun hesitated. “Do you really think Hana would've forgotten?”

Reina sighed “Let me ask you this. Has Hana ever spoken to you during the holidays? No, right?”

Reina continued “She only needs your help for exams. After that, you're forgotten. She has her own life, and you're not a part of it.”

Reina added “She'll pretend you're important when she needs you. Once you're not useful, she throws you away.”

Jun felt a lump in his throat.

Reina moved closer and looked into his eyes with raised eyebrows “Do you want to waste your time waiting for someone like that?”

“No..” he whispered.

Behind him, Reina spotted Hana's blurry figure approaching. To make sure Jun wouldn't see, Reina put her arm around and guided him away.    
    `,
    suffix: ``,
    author: `Nitesh`,
    options: [
      { text: `Jun listens to Reina’s advice`, nextScene: 16 },
      { text: `Jun insists on waiting for Hana`, nextScene: 17 },
    ],
  },
  {
    id: 16,
    prefix: ``,
    text: `
Jun stands there, his eyes distant, like he’s trying to piece together a puzzle with half the pieces missing. Reina watches him, expecting some kind of reaction—confusion, irritation, anything. But, as usual, he just… stands there.
She clicks her tongue, crossing her arms. “You really are hopeless.”
Jun blinks at her, his expression unreadable. Maybe he doesn’t even realize she’s insulting him. Maybe he does and just doesn’t care. Either way, the way he just exists—so timid, so awkward—makes something twist in her chest.
Reina exhales sharply, like she’s trying to push the feeling away before it settles. It doesn’t work. Instead, a small, reluctant smile tugs at her lips.
“…Maybe Hana isn’t the only idiot today.”
Her voice is softer than she meant it to be, and that annoys her. But what annoys her more is that, for the first time, she’s starting to understand exactly why Hana acts like such a fool around this clueless guy.    
    `,
    suffix: ``,
    author: `Aditya Kudre`,
    options: [
      { text: `Jun realizes Reina might have a point`, nextScene: 104 },
      { text: `Jun realizes Hana isn’t the type to stand him up, he turns and leaves`, nextScene: 18 },
    ],
  },
  {
    id: 17,
    prefix: `Hana arrived out of breath. But Jun wasn’t there. She paused, her heart sinking. Why did it have to be this way? Why couldn’t it be different? Maybe… just maybe… in another universe, Jun would have called her here. Yes! Hana could see it clearly, as if it were real.`,
    text: `
“Haaah… made it finally.” Hana said, panting. But there was no Jun there.
Her watch ticked 6:08pm. “Late.” She said, annoyed. “The "celebrity" wants something from me and he doesn’t even show up.” She decided to wait.
Jun had been the moon of the school. Studious, fit, handsome, humble, charismatic, coming from a respected family. He lacked nothing, almost. He was almost too popular, and had seen its consequences. Something bugged him. Noone had ever shown romantic interest in him in his seventeen springs.
He realized it recently. This "ideal image" had cannibalized his romantic chances. Girls around him always fell into 3 camps. First, the biggest camp: too nervous or captivated. Second: few who wanted the “popular boyfriend”. Third: saw him as a fake.
"Something has to change." Jun thought. He decided to ask someone for advice. Someone who receives confessions regularly. But that someone apart from being confident, intelligent and social, must not like him. The only person he could think of was someone he "took the spotlight from", as she said, when he arrived in the school two years ago. Hana was the perfect candidate. She gave him the chills.
Jun arrives moments later, sprinting. "Sorry Hana. The teacher ....". "Shut up. Just tell me why you called me." Hana interrupted. After a long silence, Jun took a deep breath and gathered his courage, which made Hana nervous. "I...I want your advice. Please. I don't know what to do. I...I want to find love."
Hana was bracing for something big, she was still dumbfounded.    
    `,
    suffix: `Hana shook herself out of her delusions. What on Earth was she doing? She cleared her head and`,
    author: `Ashu`,
    options: [
      { text: `Goes closer to the tree and searches for him`, nextScene: 18 },
      { text: `Pulls out her phone and goes around the tree`, nextScene: 20 },
    ],
  },
  {
    id: 18,
    prefix: `Jun is standing behind the tree, flustered and clearly out of breath.`,
    text: `
Jun hastily puts his flip phone behind his back, and sees Hana. He waves awkwardly, trying to act as normal as possible, "Hi Hana, did you need something?"
"Hi... Hi Jun," chimes back a timid Hana. "Y-Yes, why yes. Actually... there is something I wanted to talk to you about." She continued "The thing is, I like, no love --", only to be rudely interrupted by a sudden gust of wind. The wind caused a shower of petals to suddenly fall from the Sakura tree. The two were suddenly blanked in petals. Hana twirls around, shaking off the petals from her sailor uniform. She reached out into her bag, and pulled out a notebook.
"You... I think you left this behind." she continued, somewhat anxiously. The notebook had "Jun" penciled in rough lettering on the cover. She flipped through a few pages, revealing anime style artwork of a number of different girls, each one carrying what appeared to be a staff and with a stuffed animal. "I... I love... magical girl shows, just like you," continued Hana. "We are now in middle school... and I am scared of being made fun of... I told the others."
"I'm so glad," she said, as she handed the book back to Jun. "I finally found someone I can talk to about my favorite genre with about". "What's your favorite? Mine is Pretty Cure!! Oh, but I love Madoka Magica too!!"
Jun breathed a sigh of relief, and his anxiety faded away. "I'm more of a Cardcaptor Sakura fan myself."
    `,
    suffix: `Both of them giggle. Still remembering the phone behind his back,`,
    author: `Nivi`,
    options: [
      { text: `Jun calmly puts away his phone`, nextScene: 19 },
      { text: `Jun quickly stuffs his phone in his pocket`, nextScene: 20 },
    ],
  },
  {
    id: 19,
    prefix: ``,
    text: `
Hana’s heart raced. Why today? Her mind scrambled for answers, but the phone in his hand only deepened her uncertainty. Was he texting someone? Why did it make her feel sick?
She clenched her fists, every small movement of his magnified in her mind. Say something. Anything. But she remained frozen. She couldn’t shake the feeling that things had shifted between them, that something was wrong.
Jun stepped toward her. “I didn’t expect you today,” he said, his voice unsure.
“I didn’t plan to come,” Hana replied, the words feeling foreign on her tongue.
The silence stretched between them, heavy with all that was unsaid. Finally, Jun took a breath and spoke softly, “I’ve been thinking about us.”
Hana’s heart skipped. She opened her mouth, but her thoughts tangled, unsure if she could trust the fragile hope rising within her.
She looked at him, searching for truth. After what felt like an eternity wandering an empty mind, she whispered, “Maybe…”    
    `,
    suffix: ``,
    author: `FireflyAlibi`,
    options: [
      { text: `She decides to trust her gut and speak her heart — she can’t let this moment slip away!`, nextScene: 21 },
      { text: `She pauses and tries to compose her thoughts — she has to make this moment count!`, nextScene: 22 },
    ],
  },
  {
    id: 20,
    prefix: ``,
    text: `
Hana beneath the sprawling cherry blossom tree has her gaze fixed expectantly on Jun. In that suspended moment, her phone buzzes—a sudden interruption to her careful observation of the boy. With a reluctant flicker of curiosity, she glances at the screen. A message from Jun, clearly dispatched by accident, reads: “Ugh… totally forgot the meeting details. And—oh, remind me to call Mom later.”

Her cheeks burn a deep crimson, a mix of irritation and unspoken delight stirring within her. The mundane text, so far removed from the intimate exchanges she secretly craved, leaves her caught between scolding him for his carelessness and treasuring his unguarded authenticity. Hana’s tsundere nature rebels at the vulnerability this slip reveals, even as her inner thoughts spin with memories of his endearing awkwardness.

For a breathless moment, the air around the cherry blossom tree feels charged with unsaid words and uncertain intentions. Jun shifts awkwardly, his anxious eyes darting to meet hers, silently pleading for understanding. Yet no confession is uttered—only the fragile tension of two hearts dancing on the edge of revelation, suspended in time and promise, before the scene fades into the twilight. The night air carries a faint hint of distant laughter and soft murmurs, mingling with the rustle of leaves—a reminder that life continues around them even as this moment trembles on the edge of possibility.    
    `,
    suffix: `Hana decides she should`,
    author: `R`,
    options: [
      { text: `Laugh and tease Jun about it`, nextScene: 23 },
      { text: `Pretend like she doesn’t know a thing`, nextScene: 24 },
    ],
  },
  {
    id: 21,
    prefix: ``,
    text: `The wind flows gently, providing the perfect romantic atmosphere. Jun stands there, deep in thought about what he’s going to witness in the next few moments. “Is she going to do it?” he thinks, while Hana is fiddling with her hand. Her face is as red as an apple, blushing like a heroine in a romcom anime, at least that’s what Jun thinks. She starts muttering something, “W-Will you..”. Jun barely hears her. “Will you g-go..”. Jun immediately realizes what’s about to happen. “Oh lord, is this it? Is this the moment of my popularity? I feel like the main character in a romcom anime!” Jun thinks to himself. “Ahh screw it, this isn’t like me. I’m just going to come out and say it. Will you go watch the new superhero movie with me?” Hana blurts it out. “Eh?” Jun stares at Hana, trying to understand what just happened. “Phew I finally said it. I didn’t want to come off as childish you know? I am so embarrassed to admit this but I still love superheroes” Hana says while chuckling shyly. Jun continues to stare like he’s a Buddha statue. A long awkward silence sets in. “Hellooo.. Earth to Jun! Are you listening?” Jun quickly snaps out of it, smiling awkwardly “O-Oh. Yes, s-sure heh heh”. “Wait a second, did you expect me to say something else?” Hana asks. “Huh? N-No, of course not!” Jun starts blushing. “Hehhh, is that so?” Hana playfully teases him.`,
    suffix: `Hana and Jun stare at each other after what Hana just said. At this point`,
    author: `Nanashibi`,
    options: [
      { text: `Jun forces a laugh at what Hana just said`, nextScene: 102 },
      { text: `Hana covers her face and runs away`, nextScene: 25 },
    ],
  },
  {
    id: 22,
    prefix: `Hana manages to speak, but her words are shaky. Jun listens intently, his face unreadable.`,
    text: `
The weather outside seems perfect for almost any activity. Jun has a tiny hint of excitement on his face as he remembered Hana had asked him to meet her by the ethereal cherry blossoms. He looks at Hana but it seems like she was fidgeting as though she was nervous to talk to him. 
"How typical of her!", he thought to himself as he had a warm smile on the inside. Seeing her nervous to talk to him always made him feel serene, he believed she was the only one around who he could be himself. 
Hana realised his presence, she couldn't keep her composure. She was never good at communicating her feelings to him, she could never understand the emotion behind his stoic face, which always flustered her. Hana was at a loss for words, she always felt cozy around Jun but Hana relied on understanding the facial expressions and body language of others while talking to others. Jun just nodded with a blank expression on his face.
Hana had to muster up some courage to talk to him. She had to think quick. She brought herself back to the present, to see Jun still there. Hana turns red.    
    `,
    suffix: `In this awkward emotional standoff, who acts first?`,
    author: `Aryan`,
    options: [
      { text: `Jun`, nextScene: 26 },
      { text: `Hana`, nextScene: 101 },
    ],
  },
  {
    id: 23,
    prefix: ``,
    text: `
Hana smirks and waves her phone at Jun. "Did you really mean to send this to me?" she teases. “You’re so clumsy, Jun! But I guess that’s part of your appeal!” 
Jun’s face reddens. “I’m sorry! That message was meant for someone else! I didn’t mean to send it to you, so can you please ignore it?” 
“Oh… so are you saying I’m not your friend?” Hana pretends to be offended. Jun adjusts his collar nervously, wondering how he could have been so careless in who he sent the text to!
 “Of course you’re my friend too! I just…” he tries to cover up. “I meant that it was meant for another friend, so…” 
Hana laughs aloud. “I’m just kidding, Jun! Why are you so flustered?”
She walks up to him and pats him on the back in a familiar manner. But a pat from Hana’s strong arms knocks the wind out of a normal person. Jun staggers forward from the impact of the hit. “Hana… you have no control over your own strength…” 
“Sorry! Sorry!” Hana laughs louder and rubs the back of her head.
“Anyway…Hana… about the text… please forget about it! I’m really sorry!” Jun is fixated on his mistake. He seems extra awkward around Hana. 
Hana finds his behaviour extremely cute. She struggles to keep her heart under control as she observes Jun’s expressions and reactions. 
“Wow Jun! It’s really not a big deal!” She reassures him. “You’re acting like you made a mistake in front of a girl you like!” 
Hana says this lightheartedly, but her body feels like it is in a free fall. How will Jun react…?    
    `,
    suffix: ``,
    author: `Ila`,
    options: [
      { text: `Jun says nothing, nervous`, nextScene: 102 },
      { text: `Jun blushes, shy`, nextScene: 101 },
    ],
  },
  {
    id: 24,
    prefix: `Hana tries to pretend like everything is fine but she’s too much of an open book. She clutches her phone tightly and stares at the ground, unable to look Jun in the eye. The tension thickens.`,
    text: `
Hana stops abruptly, her breath catching, fingers nervously twisting the hem of her sleeve. Everything feels too quiet.

Jun swallows, shifting anxiously. His lips part, hesitant, before he finally speaks. “Uh… Hana?” His voice is quiet, unsure, yet impossibly gentle.

She exhales sharply, heat rising to her cheeks. “What?” The word slips out harsher than she means, but she doesn’t know how to take it back.

The silence between them thickens, charged with something unspoken, something fragile yet overwhelming. She should tease him, roll her eyes, pretend this is nothing—but her hands won’t stop shaking.

In the heavy silence that follows, every unspoken word hangs between them    
    `,
    suffix: `
Jun took a deep breath and dove into a deep bow. "I’m so sorry! This must be so disappointing for you! I’m an absolute failure. I can’t do anything right. I’m always awkward and weird, and there’s just so much wrong with me as a person!"

Hana stared at Jun, bowed before her, anxiety rising in her chest.
    `,
    author: `Rajesh`,
    options: [
      { text: `Neither speak`, nextScene: 102 },
      { text: `Jun remains silent`, nextScene: 22 },
    ],
  },
  {
    id: 25,
    prefix: `Hana runs with her hands covering her face. Not being able to see where she’s going, she bumps into someone. Reina watches as Hana stumbles into her, clearly flustered. "You again?" Reina sighs.`,
    text: `
Hana's eyes narrowed into a glare “What’s it to you?”

Reina’s hand clenched into a fist. It wasn’t enough for this girl to storm into her life and take away the person she cared about the most. She had to be insufferable about it.

Reina took a deep breath. Hana wasn’t the only one who could play that game.

“You know you can just ask him to walk home with you, right?” Reina waved her hand in the direction of where Jun was. “Instead of just waiting for him to come out of class and ‘bumping’ into him every day.”

Hana’s face flushed a deep red. “Why would I even want to–”

Reina chuckled. "You’re really bad at this, you know?"

Hana shot her a glare. "Excuse me?"

"You act tough, but you can’t even say what you want to say." Reina smirked at her. "It’s so obvious it’s painful."

She stepped closer, inches from Hana’s face. “If you want to make a move, you’d better do it soon. Otherwise someone else might be very interested in taking your place.”

Hana’s eyes looked into hers for a second before she broke away. “Whatever,” she muttered. “See if I care.” She walked away, her footsteps cloud and angry.

Reina frowned as she turned towards Jun under the cherry blossom tree.. This was supposed to make her feel better–but then why did she feel a knot in her stomach?
    `,
    suffix: ``,
    author: `wi0lono`,
    options: [
      { text: `Reina runs towards Jun`, nextScene: 104 },
      { text: `Reina runs towards Hana`, nextScene: 103 },
    ],
  },
  {
    id: 26,
    prefix: ``,
    text: `
Jun interrupts Hana mid-sentence, his voice shaking. "Hana, before you say anything, I need to tell you something first."

Hana blinked, her words caught in her throat. "What?"

Jun nodded slowly, his eyes darting down to his shoes. His voice came out quieter than he intended. “But… Hana, before you say anything—" he paused, his voice cracking a bit—"I, um, I need to ask… What did you mean by it?”

Hana blinked, caught off guard. “What?”

“The note. You… you just slipped it onto my desk without saying anything. And it wasn’t exactly… clear.” He laughed awkwardly, rubbing the back of his neck. “I thought you were mad at me at first. You always leave notes when you’re mad at me.”

“I do not!” Hana snapped, her cheeks flushing a deeper shade of pink. “And for your information, that was different!”

Jun’s eyes widened. “So you were mad?”

“No! I mean—ugh!” Hana pressed her palm to her forehead, clearly frustrated. “It wasn’t about that! Why would I write something like this just to be mad?”

Jun looked at her, utterly bewildered but somehow determined to piece it together. “So… you weren’t mad. Then… you’re not trying to tell me off for something?”

“No!” Hana’s voice was louder than she intended, and she bit her lip. *Why does he have to make this so difficult?!*
    `,
    suffix: ``,
    author: ``,
    options: [
      { text: `Jun stands confident`, nextScene: 101 },
      { text: `Jun stands awkwardly`, nextScene: 102 },
    ],
  },
  {
    id: 27,
    prefix: `A talking cat suddenly appears near Jun and Hana under the cherry blossom tree. "What is with all this hesitation? Just confess already!" it says in an exasperated voice.`,
    text: `
Both Jun and Hana freeze. They turn in sync to look at the cat, and then back at each other.

“C-c-c-confess!!” Hana exclaimed, turning away from Jun, hands covering her face. “W-w-who was going to confess!? Certainly not me!!” 

“T-t-the cat just spoke!” Jun shouted at the same time. “Hana-chan, did you hear that?” 

“Now, now,” the cat interjected, “Don’t speak all at once. It is hard to hear both of you.” It sat down and licked its paw.

Jun took a few deep breaths, trying to calm himself down. After a few moments, he looked up, and saw Hana looking at the cat, her face slightly red. 

“What are you?” Hana asked the cat, “How can you talk?”

“I am Ryuji,” the cat replied, while continuing to groom itself. “And I am here to guide the two of you.”

“Guide us?” Hana asked, puzzled. “Guide us to what?”

“And why did you only show yourself now?” Jun continued. “What made this the correct time?”

“Those are all excellent questions,” Ryuji said, sitting up on its paws. “I will answer them, but not now. What you need to do, Hana, is confess to Jun, like you’ve been planning for the past week. And Jun, you just have to follow your heart.”

“I was going to ask Jun about… homework!” Hana shouted furiously. “I certainly wasn’t going to confess now!”

“Tick tock,” Ryuji said, unphased. “I can’t wait for the two of you forever, you know”
    `,
    suffix: `Ryuji snickered, much like a Cheshire Cat, before leaping up and swiftly scaling the cherry blossom tree. The pair tried to follow the feline’s path, but the cat seemed to vanish among the pink petals. They glanced at each other, bewildered.`,
    author: `Faust`,
    options: [
      { text: `They both are thrown off by the appearance (and disappearance) of a talking cat`, nextScene: 102 },
      { text: `Hana and Jun burst out laughing, breaking the tension`, nextScene: 101 },
    ],
  },
  {
    id: 28,
    prefix: `An argument slowly breaks out between the two.`,
    text: `
The heated argument between Hana and Reina cut through the quiet evening air. Junko, Hana’s friend, was still lingering near the dugout, flinching at the sharpness in Hana’s voice. She didn’t want to get involved—but the tension was building fast.

Before she knew it, her legs moved on their own.

She sprinted over, her breath catching as she grabbed Reina’s wrist, holding her back with ease. Reina tensed, glaring up at her.

“Junko?” Reina huffed, eyes flashing with annoyance.

Junko swallowed hard. “Stop it. Both of you.”

Hana, arms crossed, shot a glance at Junko. “Stay out of this.”

Junko’s grip tightened. “No. I won’t.” Her voice wavered, but she pushed through. “What’s going on?”

Reina scoffed. “Oh, please. Do you really think Hana will explain?”

Hana’s jaw clenched. Junko could see the frustration in her eyes—maybe even something else, something unspoken.

Junko shifted slightly, standing between them now. “Then someone better start talking.”

A tense silence followed.

Then Hana exhaled, looking away. “It’s… just baseball stuff.”

Reina’s smirk deepened. “Sure, if that’s what you want to call it.”

Junko didn’t understand, not really. But she knew one thing—this fight wasn’t just about baseball. And she was stuck right in the middle of it.
    `,
    suffix: `Hana takes a deep breath, why was she fighting with Reina like this? At this point, she should calm herself and think logically. The best course of action would be-`,
    author: `Vankot`,
    options: [
      { text: `To run away`, nextScene: 17 },
      { text: `To ask Junko to release Reina`, nextScene: 104 },
    ],
  },
  {
    id: 101,
    prefix: `**“A Love Fulfilled”**`,
    text: `
The afternoon sun hung low in the sky, draping everything in gold, as though the world itself held its breath for what was about to unfold. Beneath the familiar tree, Hana and Jun stood, surrounded by the soft hum of cicadas and the whisper of the wind. Petals floated in lazy spirals around them, carried by a breeze that seemed almost sentient, curling between them like a thread tying two hearts together.

Jun’s breath felt heavier in his chest, though the air around him was light and sweet, smelling faintly of cherry blossoms. He couldn’t quite tell if the warmth blooming in his chest was from the Sun or the way Hana was looking at him, her eyes wide and expectant, her lips slightly parted as though holding back words that were too precious to say out loud. He clutched his bag tighter, steadying himself.

“I like you,” Jun said, his voice barely above a whisper, yet strong enough to shift the air between them. “I’ve liked you for a long time. Even if I didn’t know how to say it, even if I’ve probably messed up a hundred times trying to show it… it’s always been you.”

Hana’s breath caught. For a moment, the world felt like it had tilted off its axis, leaving only the two of them suspended in this fragile, perfect moment. The wind wrapped around her like a soft embrace, and her heart ached in the best possible way.

“You’re such an idiot,” she muttered, her voice trembling slightly. She looked down for a second, her fingers brushing against the hem of her skirt. “But… I like you too. I always have.”

The breeze seemed to pick up, twirling around them in delight, scattering pink petals like confetti in celebration. Jun’s eyes lit up, a boyish grin spreading across his face, and for the first time, Hana saw him without his usual hesitations—a version of Jun she hadn’t known she was waiting for.


A few steps away, Reina stood in the shadow of the tree, her arms crossed. Her usual calm expression remained, but her eyes betrayed her. The wind tugged at her hair as she watched the scene before her unfold, an ache rising in her chest. She had never put it into words before, but the feeling was unmistakable; sharp and soft all at once. *It was always more than a rivalry, wasn’t it?*

The air carried a mix of bittersweetness and serenity, weaving it through her heart like the last notes of a song that had meant everything. Reina’s lips curled into a faint smile, though it didn’t quite reach her eyes. *This isn’t my ending, she thought, but it is theirs.*

Hana glanced her way, their eyes locking briefly. There was no pity in Hana’s gaze, only a quiet understanding, a shared truth neither needed to speak aloud.


Jun moved past Hana, his shoes crunching softly against the fallen petals. He turned at the edge of the path, the wind tossing his hair gently as though urging him forward. For a moment, he stood framed by the light, petals swirling around him, the very air shimmering with possibility.

He smiled. Open, warm, and impossibly bright. His hand stretched out toward Hana, palm up, waiting. “Hana… let’s go.”

The breeze whispered between them as Hana stepped forward, her fingers brushing against his before curling around them. His hand was warm, steady and reassuring, grounding her in a moment that felt both dreamlike and achingly real.

They walked away together, the sunlight casting long shadows behind them, blending into the soft gold of dusk. The petals swirled in their wake like a final blessing, carried by the wind as if it, too, was ready to see them off on this new journey.

Reina stayed under the tree for a little while longer, her heart settling with each breath. With a quiet sigh, she turned and walked in the opposite direction, the wind at her back, gently urging her on. Her story wasn’t over just yet, she was sure of it.

But for Hana and Jun, this was the chapter they had been waiting for. A love fulfilled, carried on the wings of the wind and woven into the fabric of the air around them. Forever.
    `,
    suffix: ``,
    author: ``,
    options: [
      { text: `Play Again`, nextScene: 0 },
    ],
  },
  {
    id: 102,
    prefix: `**“A Love Unspoken”**`,
    text: `
The air hung thick with the scent of blossoms and something unspoken, swirling between them like a ghost of words too heavy to be said. Jun’s heart thrummed in his chest, loud enough that he wondered if Hana could hear it. He shifted his weight from one foot to the other, his eyes flickering between the petals at their feet and the horizon beyond the tree, anywhere but her face.

“So,” Hana began, her voice a little too casual, her arms crossed defensively. “You got my note.” Jun nodded, his throat dry. “Yeah… I got it.” He cleared his throat, paused, eyes glued to his shoes. “Um… thanks?” Hana blinked. “Thanks?” Her brow furrowed as her fingers tightened around the strap of her bag. “It wasn’t- I mean, it wasn’t exactly something you say thanks for.”
“Right.” Jun cleared his throat, still not looking up. “I… I just thought maybe it was… like, um, you were telling me something important?” His voice cracked slightly, and he winced.

The wind picked up, swirling petals around them in slow spirals, almost as if trying to fill the uncomfortable silence that followed.

Neither moved. 

Neither spoke. 

The air grew heavy, weighted with everything unsaid. Every question, every half-formed sentence they couldn’t bring themselves to finish. “I wasn’t mad,” Hana finally said, her tone softer now, her eyes flickering toward the tree branches above them. “If that’s what you were thinking…” Jun nodded again, his lips pressing into a thin line. “Oh. That’s good, I guess.”

The wind whispered between them, its gentle tug urging them forward, but neither took a step.


Not far away, Reina watched from her spot beneath another tree, her arms crossed. She had prepared herself for something dramatic, something she’d regret seeing. But as she stood there, she found herself oddly relieved. No grand confessions. No stolen kisses beneath the sunset. Just awkward silences and darting glances. 

Reina exhaled slowly, her chest lightening with every breath. *‘Hana and Jun,’* she thought with a small, satisfied smile, *‘the most hopeless pair I’ve ever seen.’* Upon staring for a brief moment longer, Reina blinked in disbelief. *‘Wait..they kinda look like… cows,’* she thought, stifling a laugh, *‘two cows waiting to be beamed up into a UFO.’*


Jun finally looked up, his eyes meeting Hana’s for a fleeting second before darting away again. “Well,” he said, rubbing the back of his neck. “I guess… I’ll see you in class?” “Yeah.” Hana nodded, her voice steady despite the tangle of emotions in her chest. “See you.” Jun turned and walked away, his steps just a bit too quick. Hana stood there for a moment, watching his retreating figure before letting out a long sigh. The breeze stirred the petals around her feet, and for a split second, she thought of calling out to him. But the moment passed, and the words stayed locked inside her chest.

*‘Yup. Definitely cows,’* Reina thought, biting her lip to keep from laughing. Weird, awkward cows standing in a field, waiting for the aliens to take them home

Reina watched Jun walk away, his pace a little too fast to be casual. Hana stood there, arms still crossed, looking vaguely like she’d just lost a staring contest with a tree.

The wind picked up again, swirling petals between them like it had gotten bored and decided to play mediator. But even the wind couldn’t salvage this train wreck of ‘confession’.

Reina exhaled slowly, shaking her head in disbelief. That was excruciating. But at least she’d gotten a front-row seat to what might have been the most awkward almost-confession in human history. “Cows,” she muttered to herself as she turned to leave, chuckling under her breath. “Weird, awkward cows.”


For now, the tree stood as it always had, bearing witness to a love left unspoken—carried off in pieces by the wind, waiting for another day.
    `,
    suffix: ``,
    author: ``,
    options: [
      { text: `Play Again`, nextScene: 0 },
    ],
  },
  {
    id: 103,
    prefix: `**“An Unexpected Love”**`,
    text: `
Cherry blossoms are a symbol of impermanence. Like fondant roses on a cake, they decorate a brief slice of springtime only to scatter in the wind, gone as quickly as they came. They are as ephemeral as life itself; one might say they embody death, if anything. And yet, this stage play called life never closes the curtains for good. As the sakura bows out, other flowers take the stage to keep the show going on. She is the much-vaunted star of the show, yet in her absence one can better appreciate the beauty of these new actors, and the way they ensure the meadow is never devoid of colour and life.

Such were Reina’s musings as she crouched low to the ground. *Why am I even thinking about all this, at a time like this?* She did her best to avert her gaze, unwilling to look Hana in the eye. A spectacular reversal of roles, this. Not one she was accustomed to playing. 

A flash of pink caught her eye: not sakura, but something else, something deeper. She turned in its direction, careful to still keep her eyes away from Hana’s, and spotted a stand of pink lilies. Small and scarce they might have been in the grander scheme of the sakura grove, but inconspicuous they were not. The pink they brought into the mix was a uniquely colourful shade of their own that enriched the blushing landscape.

*Ah, summer is already here, isn’t it?* Reina continued to stare at the lilies, transfixed. “Beautiful.”

“Eh, who are you talking to?”

Reina snapped back to reality instinctively, and before she knew it she was looking into Hana’s inquisitive eyes. *Damn it.* This was dangerous. Her suave demeanour had all but vanished, and she no longer held the upper hand here. She had to escape. Yet all she could do was stare.

“Reina?”

Hana’s eyes were filled with genuine concern. She had always been a genuine person, despite her failed attempts at pretending otherwise. It was what made teasing her fun, but now it felt...different. *This is dangerous. Wait, her eyes...were they always that colour?* The bluish grey was pleasant to rest one’s eyes on. A shade that enriched the landscape of Reina’s heart. *Wait what?!*

“Reina...?”

The opportunity for escape had long since passed. Now, only a painful extrication was possible. If she even wanted that. Reina looked up. *Spring has ended. Summer is here. Summer is...just as beautiful.* Her mind was made up. Seasons change, and so could she. She rose.

“Oh finally, are you o— eh, Reina?”

Hana tilted her head quizzically as Reina walked in the opposite direction. She expected to feel relief, but she was...disappointed?

Reina stopped at one point and bent down to pick something up. She fiddled with the ground, and then something in her bag. Then she turned around.

“Rei...na?”

Three lilies stood in a makeshift paper bouquet. Reina’s expression was inscrutable as she held them and slowly walked towards her. The sight was so striking that everything else faded into the background for Hana — the cherry blossoms, the aghast expression of Jun in the distance, her own feelings of animosity towards Reina.

Reina continued to make her way towards Hana with hesitant footsteps, until the two girls stood face to face, closer to each other than they’d ever been.

Reina looked Hana straight in the eye. “I think...this *hana* is my favourite of them all.”

Hana’s cheeks turned the colour of the lilies. Her mind was racing, but to nowhere in particular. She couldn’t process a single coherent thought. But she knew she had to answer Reina, and she decided to go with her gut.

She gently grasped the bouquet to accept it. The light brush of fingertips surprised Reina, as did the hammering of her heart in response.

Hana smiled. “You have always had a way with words, huh?”

Reina blinked twice, and then returned the smile, albeit weakly. “You’re always kinda direct.”

“Eh? Um, I’m so—”

“I think...that’s a nice thing” Reina’s smile deepened. She stepped closer to Hana. “Want to put these in a vase or something?”

Hana looked up, somehow feeling strangely liberated. “Yes, I think that would be a nice thing, too.”

The lilies rippled in the winds of change, as if they were giggling to themselves about the unexpected love blossoming in front of their all-seeing eyes.
    `,
    suffix: ``,
    author: ``,
    options: [
      { text: `Play Again`, nextScene: 0 },
    ],
  },
  {
    id: 104,
    prefix: `**“A Love That Got Away”**`,
    text: `
Jun looks at his phone and breathes a sigh of relief. Hana had cancelled on him. He was afraid Hana would confess to him, but he had always only seen her as a friend. Just as he gets ready to leave, he hears a familiar voice call out to him! “Jun-Jun!” 

“Reina!” Jun smiles as he watches Reina walk up to him. She moves elegantly, the confident air of a stage performer radiating from her. He appreciates her steady walk and proud face. 

“Jun-Jun!” She reaches him. 

“How did you know I was here, Reina?” Jun asks. 

“I ran into Hana-tan on the way here! She told me you’d be here!” A smirk dances on Reina’s lips. She takes Jun’s hand as if it were the most natural thing in the world for her to do. “Jun-Jun, aren’t the cherry blossoms beautiful in the sunset? I know you don’t like them, but right now, in this moment, doesn’t it feel sublime?” 

Jun looks around at the falling petals. His eyes follow one of them till it lands in the gentle breeze right onto Reina’s head. He raises his hand to brush it off her hair without thinking, but freezes when his fingers reach her. Reina’s is looking up at him with an intensity in her eyes. Her cheeks are flushed. Jun realises she looks beautiful in the setting sun, with the pink petals flowing all around her. His cheeks turn red. 

“Jun-Jun… I like you. I’ve always liked you.. Will you go out with me?” 

“Reina, I…”
***
Hana sends a text to Jun: *“Um actually something came up and I can’t make it to our meeting…”* 

The tears start to pool in her eyes. Of course Jun does not like her! Of course Reina is a better match for him! 

Hana struggles to hold her tears in and makes her way to the showers. As she’s entering the showers, her friend from the baseball club, Junko, who had stayed behind late to practice, notices her. “Oh, Hana! I thought you were busy today and didn’t stay back for sports! Why are you here?” 

Hana stays silent. 

“Hana… are you okay…?” Her friend looks at her with concern.


Hana is unable to hold in her tears any longer and they start spilling out. She squats down on the floor and holds her head as she starts to weep. “I.. *hic*… I couldn’t confess my feelings to my c..*hic*..crush! It didn’t work out. He has someone else!” 

Hana’s friend rushes to her side to console her. She holds her and rubs her back, waiting patiently as Hana cries her heart out. That’s just what heartbreak is – a love that got away, slipping through trembling fingers, never meant to be held.
    `,
    suffix: ``,
    author: ``,
    options: [
      { text: `Play Again`, nextScene: 0 },
    ],
  },
];
