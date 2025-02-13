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

-Can't wait for them to tone down the random encounter rate a second time and still have it be too damn high    
    `,
    suffix: `Reina giggled.`,
    author: ``,
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
    text: `Passage`,
    suffix: ``,
    author: ``,
    options: [
      { text: `Option 1`, nextScene: 102 },
      { text: `Option 2`, nextScene: 25 },
    ],
  },
  {
    id: 22,
    prefix: ``,
    text: `Passage`,
    suffix: ``,
    author: ``,
    options: [
      { text: `Option 1`, nextScene: 26 },
      { text: `Option 2`, nextScene: 101 },
    ],
  },
  {
    id: 23,
    prefix: ``,
    text: `Passage`,
    suffix: ``,
    author: ``,
    options: [
      { text: `Option 1`, nextScene: 102 },
      { text: `Option 2`, nextScene: 101 },
    ],
  },
  {
    id: 24,
    prefix: ``,
    text: `Passage`,
    suffix: ``,
    author: ``,
    options: [
      { text: `Option 1`, nextScene: 102 },
      { text: `Option 2`, nextScene: 22 },
    ],
  },
  {
    id: 25,
    prefix: ``,
    text: `Passage`,
    suffix: ``,
    author: ``,
    options: [
      { text: `Option 1`, nextScene: 104 },
      { text: `Option 2`, nextScene: 103 },
    ],
  },
  {
    id: 26,
    prefix: ``,
    text: `Passage`,
    suffix: ``,
    author: ``,
    options: [
      { text: `Option 1`, nextScene: 101 },
      { text: `Option 2`, nextScene: 102 },
    ],
  },
  {
    id: 27,
    prefix: ``,
    text: `Passage`,
    suffix: ``,
    author: ``,
    options: [
      { text: `Option 1`, nextScene: 102 },
      { text: `Option 2`, nextScene: 101 },
    ],
  },
  {
    id: 28,
    prefix: ``,
    text: `Passage`,
    suffix: ``,
    author: ``,
    options: [
      { text: `Option 1`, nextScene: 17 },
      { text: `Option 2`, nextScene: 104 },
    ],
  },
  {
    id: 101,
    prefix: ``,
    text: `Happy ending (medha): “A Love Fulfilled”`,
    suffix: ``,
    author: ``,
    options: [
      { text: `Play Again`, nextScene: 0 },
    ],
  },
  {
    id: 102,
    prefix: ``,
    text: `Awkward ending (medha): “A Love Unspoken” `,
    suffix: ``,
    author: ``,
    options: [
      { text: `Play Again`, nextScene: 0 },
    ],
  },
  {
    id: 103,
    prefix: ``,
    text: `Twist ending (Manas): “An Unexpected Love” `,
    suffix: ``,
    author: ``,
    options: [
      { text: `Play Again`, nextScene: 0 },
    ],
  },
  {
    id: 104,
    prefix: ``,
    text: `Rival ending (Manas): “A Love That Got Away”`,
    suffix: ``,
    author: ``,
    options: [
      { text: `Play Again`, nextScene: 0 },
    ],
  },
];
