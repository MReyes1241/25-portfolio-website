import React from 'react';
import UnitTemplate from '../UnitTemplate';
import type { 
  OverviewData, 
  LessonData, 
  ExerciseData 
} from '../UnitTemplate';

const Unit10: React.FC = () => {
  const overview: OverviewData = {
    intro: "Explore how cooperation evolves in competitive environments through computer simulations of game theory scenarios. This unit combines programming, mathematics, and evolutionary biology to investigate the famous Prisoner's Dilemma and understand why cooperation emerges in nature despite the apparent advantage of selfishness.",
    objectives: [
      "Implement game theory simulations using classes and evolutionary algorithms",
      "Understand the Prisoner's Dilemma and its implications for cooperation",
      "Create player strategies using inheritance and polymorphism",
      "Simulate evolutionary dynamics across multiple generations",
      "Analyze how different strategies perform in competitive environments",
      "Use the random module to create probabilistic player behaviors",
      "Apply OOP principles to model complex interactions and populations"
    ],
    prerequisites: [
      "Unit 9: Object-Oriented Programming - Classes, inheritance, and polymorphism",
      "Unit 7: Functions and Modules - Functions, parameters, and the random module",
      "Unit 3: Lists and Dictionaries - List operations and dictionary manipulation"
    ],
    whyTitle: "Why Learn Evolutionary Simulations?",
    whyBullets: [
      "**Understanding Cooperation**: Explains why cooperation evolves in nature despite competitive pressures—from bacteria to humans",
      "**Real-World Applications**: Game theory models economics, politics, social behavior, and ecological systems",
      "**Computational Science**: Learn how simulations help scientists study complex systems that can't be analyzed mathematically",
      "**Advanced OOP Practice**: Apply inheritance and polymorphism to create sophisticated interacting systems",
      "**Interdisciplinary Thinking**: Connect programming with biology, mathematics, psychology, and economics",
      "**Agent-Based Modeling**: Foundation for AI, economics simulations, and artificial life research"
    ],
    topics: [
      "The Prisoner's Dilemma and game theory basics",
      "Creating player classes with different strategies",
      "Simulating encounters and tracking results",
      "Implementing evolutionary selection mechanisms",
      "Building populations of diverse player types",
      "Analyzing simulation results and emergent behaviors",
      "Creating mirror and probing player strategies",
      "Understanding tit-for-tat and cooperative strategies"
    ],
    progress: [
      { title: "Part 1: The Prisoner's Dilemma", description: "Game theory fundamentals" },
      { title: "Part 2: Creating the Player Class", description: "Building the simulation foundation" },
      { title: "Part 3: Player Subclasses", description: "Different strategies" },
      { title: "Part 4: Populations and Simulations", description: "Running encounters" },
      { title: "Part 5: Sorting and Evolution", description: "Natural selection" },
      { title: "Part 6: Future Generations", description: "Evolutionary dynamics" },
      { title: "Part 7: Mirror Player Strategy", description: "Tit-for-tat cooperation" },
      { title: "Part 8: Probing Player Strategy", description: "Advanced identification" }
    ]
  };

  const lessons: LessonData[] = [
    {
      id: '1',
      title: "Part 1: The Prisoner's Dilemma",
      summary: "Understand the famous game theory problem that explores why cooperation can emerge even when selfishness seems advantageous.",
      paragraphs: [
        "Imagine a game world where players encounter one another at random. When an encounter occurs, each player must decide whether to be 'nice' or 'nasty'. The payoffs depend on both players' choices:",
        "**If both are nice**: They cooperate and each receives 30 points",
        "**If both are nasty**: They earn nothing",
        "**If one is nice and the other is nasty**: The nasty player exploits the nice one and receives 50 points, while the nice player loses 70 points",
        "This creates a dilemma. If you think the other player will be nice, you're better off being nasty (50 points vs 30). If you think they'll be nasty, you're also better off being nasty (0 points vs losing 70). So regardless of what the other player does, being nasty seems like the best strategy.",
        "But if everyone reasons this way, everyone will be nasty and earn nothing. If everyone had cooperated, everyone would have been 30 points better off. This is the paradox: rational self-interest leads to a worse outcome for everyone.",
        "This isn't just a game—it reflects real biological and social situations. Pure self-interest would seem to be the best strategy for survival, but organisms that try to work together with others are vulnerable to exploitation. Yet evolution does produce cooperation. How can this evolve?",
        "We can unravel this paradox by simulating encounters between different types of players and seeing which strategies actually succeed over multiple generations."
      ],
      code: [
        {
          title: "The Payoff Matrix",
          code: `# Nice vs Nice: Both get 30
# Nasty vs Nasty: Both get 0  
# Nice vs Nasty: Nice loses 70, Nasty gets 50

# In game theory notation:
# Cooperation, Cooperation = (30, 30)
# Defection, Defection = (0, 0)
# Cooperation, Defection = (-70, 50)
# Defection, Cooperation = (50, -70)`
        }
      ],
      tips: [
        "The Prisoner's Dilemma shows up everywhere: evolution, economics, politics, and social behavior",
        "The dilemma exists because what's best for individuals conflicts with what's best for the group",
        "Real cooperation requires repeated interactions—one-time encounters favor exploitation"
      ],
      infos: [
        "**Historical Context**: The Prisoner's Dilemma was formalized in 1950 by mathematicians at RAND Corporation. Robert Axelrod's computer tournaments in the 1980s revealed that simple cooperative strategies could outperform complex selfish ones.",
        "**Biology Connection**: Dogs hunt together in packs, bees work for the good of the hive. Individuals cooperate and get a larger payoff than they would acting alone. Evolution does seem to produce cooperation, despite the apparent competitive advantage of pure selfishness."
      ]
    },
    {
      id: '2',
      title: "Part 2: Creating the Player Class",
      summary: "Build a Player class that can participate in encounters, keep track of scores and memory, and process results of interactions.",
      paragraphs: [
        "We'll create lots of players, so we'll start with a class defining them. Each player needs:",
        "**Identity**: A unique ID number and name to distinguish players",
        "**State**: A score tracking performance and a memory of past encounters",
        "**Behavior**: Methods to respond to other players and process encounter results",
        "The Player class is purposely missing an essential function—the one that determines how it acts when it meets another player. This response function will be different for different kinds of players, so we'll create specialized Player class for each kind. Instances will always be based on these subclasses, never on Player itself."
      ],
      code: [
        {
          title: "The Player Class",
          code: `class Player:
    idCounter = 0
    
    def __init__(self):
        self.score = 0
        self.memory = {}
        Player.idCounter += 1
        self.name = f"Player {Player.idCounter}"
    
    def processResult(self, otherName, myResponse, otherResponse):
        """
        Update score and memory based on encounter result.
        
        Args:
            otherName: Name of the player encountered
            myResponse: This player's action ('nice' or 'nasty')
            otherResponse: Other player's action ('nice' or 'nasty')
        """
        result = [myResponse, otherResponse]
        
        # Store this encounter in memory
        if otherName in self.memory:
            self.memory[otherName].append(result)
        else:
            self.memory[otherName] = [result]
        
        # Calculate score based on payoff matrix
        if myResponse == 'nice' and otherResponse == 'nice':
            self.score += 30
        elif myResponse == 'nice' and otherResponse == 'nasty':
            self.score -= 70
        elif myResponse == 'nasty' and otherResponse == 'nice':
            self.score += 50
        else:  # both nasty
            self.score += 0`
        }
      ],
      tips: [
        "The idCounter is a class attribute—it's shared by all Player instances to ensure unique IDs",
        "The __init__ function initializes score to 0 and creates an empty memory dictionary",
        "Memory stores the history of encounters: {\"Player 5\": [['nice', 'nasty'], ['nasty', 'nasty']]}",
        "processResult is called after each encounter to update both players"
      ],
      warnings: [
        "The Player class doesn't have a respondsTo method—you must create subclasses that implement this",
        "Make sure to call Player.__init__(self) in all subclass constructors to initialize basic attributes"
      ],
      infos: [
        "**Why Use a Class?**: A class bundles data (score, memory, name) with behavior (processResult). This makes it easy to create many players, each maintaining their own independent state while sharing the same logic.",
        "**The if-elif-else Pattern**: We use an extended if-elif-else to handle the payoff matrix. This version makes it easy to see the nested logic without deeply nested if statements."
      ]
    },
    {
      id: '3',
      title: "Part 3: Player Subclasses with Different Strategies",
      summary: "Create specialized player types that inherit from Player and implement different response strategies.",
      paragraphs: [
        "Now we create subclasses of Player for different kinds of players. Each subclass specializes Player by implementing a respondsTo method that defines its strategy.",
        "The respondsTo method for every kind of player takes as an argument the name of the encountered player, in case the response depends on previous experience with this player."
      ],
      code: [
        {
          title: "FriendlyPlayer: Always Cooperates",
          code: `class FriendlyPlayer(Player):
    """A player who is always nice in every encounter."""
    
    def __init__(self):
        Player.__init__(self)
        self.name += ' (friendly)'
    
    def respondsTo(self, otherName):
        """Always return 'nice' regardless of history."""
        return 'nice'`
        },
        {
          title: "MeanPlayer: Always Defects",
          code: `class MeanPlayer(Player):
    """A player who is always nasty in every encounter."""
    
    def __init__(self):
        Player.__init__(self)
        self.name += ' (mean)'
    
    def respondsTo(self, otherName):
        """Always return 'nasty' regardless of history."""
        return 'nasty'`
        }
      ],
      tips: [
        "Both subclasses call Player.__init__(self) to initialize inherited attributes",
        "The name is modified to show the player type: 'Player 7 (friendly)'",
        "FriendlyPlayer ignores the otherName parameter but still needs it for consistency",
        "These simple strategies serve as baselines for comparison"
      ],
      infos: [
        "**Strategy Diversity**: In a population, having different types of players creates interesting dynamics. Pure strategies (always cooperate, always defect) compete with conditional strategies that adapt based on history.",
        "**Method Overriding**: By defining respondsTo in the subclass, we override the (non-existent) method from Player. Each subclass provides its own implementation."
      ]
    },
    {
      id: '4',
      title: "Part 4: Creating Populations and Running Simulations",
      summary: "Build functions to create populations of different player types and simulate random encounters between them.",
      paragraphs: [
        "To run experiments, we need facilities for creating populations and conducting encounters. We'll create a population as a collection of players of various kinds, then allow them to encounter one another at random for some time.",
        "At the end of this time, we'll see how the results and produce a new generation. The next generation will be based on the most successful individuals from the previous generation—just like natural selection. In this way, the total number of players in each generation will remain the same, but the most successful kinds of players will proliferate."
      ],
      code: [
        {
          title: "Creating a Population",
          code: `def makePopulation(specs):
    """
    Create a population of players based on specifications.
    
    Args:
        specs: List of [PlayerType, count] pairs
        Example: [[FriendlyPlayer, 4], [MeanPlayer, 8]]
    
    Returns:
        List of player objects
    """
    population = []
    for playerType, number in specs:
        for player in range(number):
            population.append(playerType())
    return population`
        },
        {
          title: "Simulating One Encounter",
          code: `def encounter(player1, player2):
    """
    Simulate one encounter between two players.
    
    Args:
        player1: First player object
        player2: Second player object
    """
    name1, name2 = player1.name, player2.name
    response1 = player1.respondsTo(name2)
    response2 = player2.respondsTo(name1)
    
    # Both players process the result
    player1.processResult(name2, response1, response2)
    player2.processResult(name1, response2, response1)`
        },
        {
          title: "Running Multiple Encounters",
          code: `import random

def doGeneration(population, numberOfEncounters):
    """
    Run a generation of random encounters.
    
    Args:
        population: List of player objects
        numberOfEncounters: How many encounters to simulate
    """
    for encounterNumber in range(numberOfEncounters):
        # Pick two random players
        players = random.sample(population, 2)
        encounter(players[0], players[1])`
        }
      ],
      tips: [
        "makePopulation uses a loop within a loop to create the specified number of each player type",
        "random.sample(population, 2) picks two different players at random",
        "Each encounter updates both players' scores and memories",
        "More encounters give more data but take longer to run"
      ],
      warnings: [
        "random.sample ensures you don't pick the same player twice for an encounter",
        "Make sure to import random at the top of your file"
      ],
      infos: [
        "**Multiple Assignment**: The line `name1, name2 = player1.name, player2.name` uses Python's multiple assignment feature to assign two variables at once, making the code cleaner.",
        "**Why Random Encounters?**: Random encounters simulate a natural environment where individuals meet by chance. This creates realistic dynamics without predetermined pairings."
      ]
    },
    {
      id: '5',
      title: "Part 5: Sorting, Reporting, and Evolution",
      summary: "Create functions to analyze results, sort players by performance, and generate new populations based on success.",
      paragraphs: [
        "Once all encounters in a single generation are complete, we need to get a report of the results. Since these ought to be sorted by performance and we'll need the same ordering to produce the next generation, we'll write one function to do the sorting and another to use the result to generate a report.",
        "The third element in the score list is for later—we'll need it when we want to produce the next generation of players."
      ],
      code: [
        {
          title: "Sorting the Population",
          code: `def sortPopulation(population):
    """
    Sort players by score and create a score list.
    
    Args:
        population: List of player objects
    
    Returns:
        List of [score, name, type(player)] for each player, sorted by score
    """
    scoreList = [[player.score, player.name, type(player)] 
                 for player in population]
    scoreList.sort()
    return scoreList`
        },
        {
          title: "Generating a Report",
          code: `def report(scoreList):
    """
    Print a formatted report of player scores.
    
    Args:
        scoreList: Sorted list from sortPopulation
    """
    pattern = "{:>6}  {:30}  {}"
    for score, name, playerType in scoreList:
        print(pattern.format(name, score, playerType))`
        },
        {
          title: "Creating the Next Generation",
          code: `def makeNextGeneration(scoreList):
    """
    Create next generation based on top performers.
    
    Args:
        scoreList: Sorted list from sortPopulation
    
    Returns:
        New population with same size as original
    """
    nextGeneration = []
    populationSize = len(scoreList)
    
    # Take top half and create two offspring each
    scoreList = scoreList[int(populationSize/2):]
    
    for score, name, playerType in scoreList:
        # Create two new individuals of the same type
        for number in range(2):
            nextGeneration.append(playerType())
    
    return nextGeneration`
        }
      ],
      tips: [
        "The list comprehension creates a three-element list for each player",
        "sort() sorts by the first element (score) by default—lowest to highest",
        "type(player) returns the class of the player (FriendlyPlayer, MeanPlayer, etc.)",
        "The top half reproduces—simulating natural selection"
      ],
      warnings: [
        "We use int(populationSize/2) to avoid floating-point issues when slicing",
        "The population size must be even for this method to maintain constant size"
      ],
      infos: [
        "**Natural Selection**: By allowing only the top performers to reproduce, we simulate evolutionary selection. Successful strategies proliferate while unsuccessful ones die out.",
        "**Using type()**: The type() function returns the class of an object. If player is a FriendlyPlayer, type(player) returns FriendlyPlayer. We can then call FriendlyPlayer() to create a new instance of the same type."
      ]
    },
    {
      id: '6',
      title: "Part 6: Producing Future Generations",
      summary: "Implement the evolutionary loop that runs multiple generations and tracks how strategies evolve over time.",
      paragraphs: [
        "Our last task before running an experiment is to write a function for producing the next generation, based on the performance of players in the current one.",
        "The sortPopulation function produces a list that contains all the information we need. We pass this list to makeNextGeneration, which creates a new population with two new individuals corresponding to—and of the same type as—each individual in the top half of the current population.",
        "This makes a new population with the same size as the original. The top half of scorers reproduce, while the bottom half are eliminated. Successful player types will increase in numbers while unsuccessful types decline."
      ],
      code: [
        {
          title: "The Complete Evolution Function",
          code: `def makeNextGeneration(scoreList):
    """
    Create the next generation based on current performance.
    
    Only the top half of performers reproduce, creating 
    two offspring each to maintain population size.
    
    Args:
        scoreList: Output from sortPopulation()
        
    Returns:
        New population list
    """
    nextGeneration = []
    populationSize = len(scoreList)
    
    # Slice off top half - these are the survivors
    scoreList = scoreList[int(populationSize/2):]
    
    # Each survivor produces two offspring
    for score, name, playerType in scoreList:
        for number in range(2):
            nextGeneration.append(playerType())
    
    return nextGeneration`
        }
      ],
      tips: [
        "Dividing by 2 and using int() ensures we get an integer for slicing",
        "15/2 is 7.5, so int(7.5) is 7, making the next generation size 2*7 or 14",
        "We use even population sizes to avoid rounding issues"
      ],
      infos: [
        "**Why Even Populations?**: We use populations of even size to avoid rounding complications. Otherwise, the next generation wouldn't be exactly the same size as the current one. For example, 15/2 is 7.5, making the next generation size 2*7 or 14.",
        "**Evolutionary Pressure**: By only allowing the top 50% to reproduce, we create strong selective pressure. This accelerates evolution and makes successful strategies dominate quickly."
      ]
    },
    {
      id: '7',
      title: "Part 7: Advanced Player Strategies",
      summary: "Implement more sophisticated player types including mirror players that copy opponents' previous behavior.",
      paragraphs: [
        "Now let's introduce a third kind of player: a 'mirror' player that reflects the behavior of players it encounters. If you're nice to a mirror player, it will be nice back next time. If you're nasty, it will be nasty back. The first time it meets you, it gives you the benefit of the doubt and is automatically nice.",
        "The key is that mirror players use their memory to look up what happened in the last encounter with this specific player."
      ],
      code: [
        {
          title: "MirrorPlayer: Tit-for-Tat Strategy",
          code: `class MirrorPlayer(Player):
    """
    A player that copies the other player's last move.
    
    Strategy: Start nice, then do whatever the opponent 
    did in the previous encounter.
    """
    
    def __init__(self):
        Player.__init__(self)
        self.name += ' (mirror)'
    
    def respondsTo(self, otherName):
        """
        Return the other player's last action against me.
        If we haven't met before, be nice.
        
        Args:
            otherName: Name of the encountered player
            
        Returns:
            'nice' or 'nasty'
        """
        if otherName in self.memory:
            # Get the most recent encounter
            lastEncounter = self.memory[otherName][-1]
            # Return what they did (second element)
            return lastEncounter[1]
        else:
            # First encounter - be nice
            return 'nice'`
        }
      ],
      tips: [
        "self.memory[otherName][-1] gets the most recent encounter with this player",
        "[-1] accesses the last element of a list in Python",
        "[1] gets the second element—the other player's action",
        "Mirror players implement the famous 'tit-for-tat' strategy"
      ],
      infos: [
        "**Tit-for-Tat**: This strategy was the winner of Robert Axelrod's famous computer tournaments. It's simple, nice (starts cooperatively), retaliatory (punishes defection), and forgiving (returns to cooperation when opponent does).",
        "**Memory Structure**: Recall that self.memory[otherName] is a list like this: [['nice', 'nasty'], ['nasty', 'nasty']]. The first element of each pair is our action, the second is their action."
      ],
      body: `
When a mirror player meets either a friendly player or another mirror player, both are nice and they cooperate to win 30 points each.

When a mirror player meets a mean player, the mean player takes advantage in the first encounter, but thereafter the mirror player is nasty back and doesn't continue to lose points.

Mirror players do well with nice players and mirror players—two-thirds of the population. Mean players do well only with nice players. As the population from the mean players have no one left to exploit and they themselves die out.

What's left is a population of mirror players who are nice to each other. They work together rather than relying on exploitation. **Evolution favors cooperation!**
      `
    },
    {
      id: '8',
      title: "Part 8: Probing Player Strategy",
      summary: "Create an even more sophisticated player that probes opponents to identify their type and exploits when possible.",
      paragraphs: [
        "A 'probing' player attempts to identify the type of other players. It's nasty in its first encounter to see how the other player responds.",
        "Based on the response, it can identify player types:",
        "- If the other player is **nice twice in a row**, it must be a friendly player",
        "- If it's **nasty twice**, it must be a mean player",
        "- If it's **nice then nasty**, it must be a mirror player",
        "- If it's **nasty then nice**, it must be another prober",
        "Once identified, the prober behaves strategically: it exploits friendly players, is nasty to mean players, and cooperates with mirrors and other probers."
      ],
      code: [
        {
          title: "ProbingPlayer: Strategic Identification",
          code: `class ProbingPlayer(Player):
    """
    A sophisticated player that probes to identify opponent types
    and then responds strategically.
    
    Strategy:
    - Nasty first to probe response
    - Nice second to confirm type
    - Then:
      * Exploit friendly players (always nasty)
      * Defend against mean players (always nasty)
      * Cooperate with mirrors and probers (always nice)
    """
    
    def __init__(self):
        Player.__init__(self)
        self.name += ' (probing)'
    
    def respondsTo(self, otherName):
        """
        Probe opponent to identify type, then respond strategically.
        """
        if otherName not in self.memory:
            # First encounter - probe with nasty
            return 'nasty'
        
        history = self.memory[otherName]
        
        if len(history) == 1:
            # Second encounter - be nice to confirm
            return 'nice'
        
        # After probing, identify and respond
        # history looks like: [[myMove, theirMove], [myMove, theirMove]]
        firstResponse = history[0][1]   # Their first response
        secondResponse = history[1][1]  # Their second response
        
        if firstResponse == 'nice' and secondResponse == 'nice':
            # Friendly player - exploit them
            return 'nasty'
        elif firstResponse == 'nasty' and secondResponse == 'nasty':
            # Mean player - defend yourself
            return 'nasty'
        else:
            # Mirror or prober - cooperate
            return 'nice'`
        }
      ],
      tips: [
        "The probing sequence takes two encounters to complete",
        "Friendly players stay nice regardless, so they respond nice-nice",
        "Mean players stay nasty regardless, so they respond nasty-nasty",
        "Mirror players copy your move, so they respond nice-nasty",
        "Other probers also probe, so they respond nasty-nice"
      ],
      warnings: [
        "Probing players sacrifice points in early encounters to gain information",
        "They only benefit if they encounter the same players multiple times"
      ],
      infos: [
        "**Strategic Complexity**: Probing players represent a more sophisticated strategy: gather information, then exploit. This works well in repeated-encounter environments where you meet the same individuals multiple times.",
        "**Real-World Parallels**: Many animals and humans use similar probing strategies: test an opponent's response, learn their behavior pattern, then adjust your strategy accordingly."
      ],
      body: `
### Experimental Results

When you run experiments with probing players, you'll find interesting dynamics:

**Experiment 1:** Initial population of 6 friendly, 6 mean, and 6 mirror players
- Mirror players meet friendly or other mirrors → both are nice (30 points each)
- Mirror players meet mean → mean exploits once, then mirror defends (0 points after)
- Mean players can only exploit friendly players

Result: Mean players die out first, mirror players thrive

**Experiment 2:** Add probing players (6 of each type: friendly, mean, mirror, probing)
- Probers identify and exploit friendly players
- Probers cooperate with mirrors and other probers
- Mean players still get eliminated

Result: **Cooperation wins out**. Even with sophisticated exploitation attempts, cooperative strategies (mirrors and probers cooperating with each other) dominate.

### The Lesson

This simulation reveals a profound insight: **evolution can favor cooperation over pure selfishness**. When interactions are repeated and individuals can remember past encounters, strategies that balance cooperation with protection from exploitation succeed.

The mirror player's tit-for-tat strategy is remarkably robust: it's nice, forgiving, retaliatory when needed, and clear in its pattern. It invites cooperation while defending against exploitation.

Try running the simulation at least 10 times. You should find that it's possible for two very different "worlds" to result from the same initial conditions—sometimes cooperative players dominate, other times exploitation strategies persist. This mirrors real biological systems where multiple stable states can exist.
      `
    }
  ];

  const exercises: ExerciseData[] = [
    {
      id: '0',
      title: "Complete Prisoner's Dilemma Simulation",
      description: "Implement the complete simulation system with friendly, mean, and mirror players. Run experiments to see which strategies succeed over 5 generations of 2,000 encounters each.",
      difficulty: "advanced",
      starter: `# Complete Prisoner's Dilemma Simulation

import random

class Player:
    idCounter = 0
    
    def __init__(self):
        # TODO: Initialize score, memory, and name
        pass
    
    def processResult(self, otherName, myResponse, otherResponse):
        # TODO: Update score and memory based on encounter
        pass

class FriendlyPlayer(Player):
    def __init__(self):
        # TODO: Call parent init and set name
        pass
    
    def respondsTo(self, otherName):
        # TODO: Always return 'nice'
        pass

class MeanPlayer(Player):
    def __init__(self):
        # TODO: Call parent init and set name
        pass
    
    def respondsTo(self, otherName):
        # TODO: Always return 'nasty'
        pass

class MirrorPlayer(Player):
    def __init__(self):
        # TODO: Call parent init and set name
        pass
    
    def respondsTo(self, otherName):
        # TODO: Copy opponent's last move
        pass

def makePopulation(specs):
    # TODO: Create population from specifications
    pass

def encounter(player1, player2):
    # TODO: Run one encounter between two players
    pass

def doGeneration(population, numberOfEncounters):
    # TODO: Run multiple random encounters
    pass

def sortPopulation(population):
    # TODO: Sort players by score
    pass

def report(scoreList):
    # TODO: Print formatted results
    pass

def makeNextGeneration(scoreList):
    # TODO: Create next generation from top performers
    pass

# Main simulation
specs = [[FriendlyPlayer, 9], [MeanPlayer, 9], [MirrorPlayer, 0]]
population = makePopulation(specs)

for generation in range(5):
    print(f"\\n=== Generation {generation + 1} ===")
    doGeneration(population, 2000)
    scoreList = sortPopulation(population)
    report(scoreList)
    population = makeNextGeneration(scoreList)`,
      solution: `# Complete Prisoner's Dilemma Simulation - SOLUTION

import random

class Player:
    idCounter = 0
    
    def __init__(self):
        self.score = 0
        self.memory = {}
        Player.idCounter += 1
        self.name = f"Player {Player.idCounter}"
    
    def processResult(self, otherName, myResponse, otherResponse):
        result = [myResponse, otherResponse]
        
        if otherName in self.memory:
            self.memory[otherName].append(result)
        else:
            self.memory[otherName] = [result]
        
        if myResponse == 'nice' and otherResponse == 'nice':
            self.score += 30
        elif myResponse == 'nice' and otherResponse == 'nasty':
            self.score -= 70
        elif myResponse == 'nasty' and otherResponse == 'nice':
            self.score += 50
        else:
            self.score += 0

class FriendlyPlayer(Player):
    def __init__(self):
        Player.__init__(self)
        self.name += ' (friendly)'
    
    def respondsTo(self, otherName):
        return 'nice'

class MeanPlayer(Player):
    def __init__(self):
        Player.__init__(self)
        self.name += ' (mean)'
    
    def respondsTo(self, otherName):
        return 'nasty'

class MirrorPlayer(Player):
    def __init__(self):
        Player.__init__(self)
        self.name += ' (mirror)'
    
    def respondsTo(self, otherName):
        if otherName in self.memory:
            return self.memory[otherName][-1][1]
        else:
            return 'nice'

def makePopulation(specs):
    population = []
    for playerType, number in specs:
        for player in range(number):
            population.append(playerType())
    return population

def encounter(player1, player2):
    name1, name2 = player1.name, player2.name
    response1 = player1.respondsTo(name2)
    response2 = player2.respondsTo(name1)
    player1.processResult(name2, response1, response2)
    player2.processResult(name1, response2, response1)

def doGeneration(population, numberOfEncounters):
    for encounterNumber in range(numberOfEncounters):
        players = random.sample(population, 2)
        encounter(players[0], players[1])

def sortPopulation(population):
    scoreList = [[player.score, player.name, type(player)] 
                 for player in population]
    scoreList.sort()
    return scoreList

def report(scoreList):
    pattern = "{:30}  {:>6}  {}"
    for score, name, playerType in scoreList:
        print(pattern.format(name, score, str(playerType)))

def makeNextGeneration(scoreList):
    nextGeneration = []
    populationSize = len(scoreList)
    scoreList = scoreList[int(populationSize/2):]
    
    for score, name, playerType in scoreList:
        for number in range(2):
            nextGeneration.append(playerType())
    
    return nextGeneration

# Main simulation
print("Prisoner's Dilemma Evolutionary Simulation")
print("=" * 50)

specs = [[FriendlyPlayer, 9], [MeanPlayer, 9]]
population = makePopulation(specs)

for generation in range(5):
    print(f"\\n=== Generation {generation + 1} ===")
    doGeneration(population, 2000)
    scoreList = sortPopulation(population)
    report(scoreList)
    
    if generation < 4:  # Don't create next gen after last generation
        population = makeNextGeneration(scoreList)

print("\\n" + "=" * 50)
print("Simulation complete!")
print("\\nNotice how mean players dominate when competing only")
print("against friendly players. Both types can coexist, but")
print("mean players have the advantage through exploitation.")`
    },
    {
      id: '1',
      title: "Add Probing Player Type",
      description: "Extend the simulation by implementing a ProbingPlayer class that identifies opponent types through strategic probing and responds accordingly.",
      difficulty: "advanced",
      starter: `# Add Probing Player to Simulation

# Copy your Player, FriendlyPlayer, MeanPlayer, and MirrorPlayer
# classes from Question 0

class ProbingPlayer(Player):
    def __init__(self):
        # TODO: Initialize with proper name
        pass
    
    def respondsTo(self, otherName):
        # TODO: Implement probing strategy
        # First encounter: be nasty to probe
        # Second encounter: be nice to confirm
        # Subsequent encounters: exploit friendly, defend against mean,
        # cooperate with mirrors and probers
        pass

# Test with initial population:
# 5 friendly, 5 mean, 5 mirror, 5 probing
specs = [[FriendlyPlayer, 5], [MeanPlayer, 5], 
         [MirrorPlayer, 5], [ProbingPlayer, 5]]
population = makePopulation(specs)

# Run for 5 generations with 500 encounters each`,
      solution: `# Add Probing Player to Simulation - SOLUTION

class ProbingPlayer(Player):
    def __init__(self):
        Player.__init__(self)
        self.name += ' (probing)'
    
    def respondsTo(self, otherName):
        if otherName not in self.memory:
            # First encounter - probe with nasty
            return 'nasty'
        
        history = self.memory[otherName]
        
        if len(history) == 1:
            # Second encounter - be nice to confirm type
            return 'nice'
        
        # Identify opponent type from first two responses
        firstResponse = history[0][1]
        secondResponse = history[1][1]
        
        if firstResponse == 'nice' and secondResponse == 'nice':
            # Friendly player - exploit them
            return 'nasty'
        elif firstResponse == 'nasty' and secondResponse == 'nasty':
            # Mean player - defend yourself
            return 'nasty'
        else:
            # Mirror or another prober - cooperate
            return 'nice'

# Full simulation with probing players
print("Extended Simulation with Probing Players")
print("=" * 50)

specs = [[FriendlyPlayer, 5], [MeanPlayer, 5], 
         [MirrorPlayer, 5], [ProbingPlayer, 5]]
population = makePopulation(specs)

for generation in range(5):
    print(f"\\n=== Generation {generation + 1} ===")
    doGeneration(population, 500)
    scoreList = sortPopulation(population)
    report(scoreList)
    
    if generation < 4:
        population = makeNextGeneration(scoreList)

print("\\n" + "=" * 50)
print("Analysis:")
print("- Probing players identify and exploit friendly players")
print("- Probing players cooperate with mirrors and each other")
print("- Mean players still lose out in the long run")
print("- Cooperation (mirrors + probers working together) wins!")`
    },
    {
      id: '2',
      title: "Reduce Encounters Per Generation",
      description: "Rerun Question 0's experiment but cut the number of encounters from 2,000 to 500. Observe and explain the results. What percentage of encounters are with strangers vs. repeat encounters?",
      difficulty: "intermediate",
      starter: `# Experiment with Fewer Encounters

# Use your code from Question 0, but change:
# doGeneration(population, 2000)  # OLD
# to:
# doGeneration(population, 500)   # NEW

# After running, answer these questions:
# 1. How do the results differ from the 2,000 encounter version?
# 2. On average, what percent of encounters are with strangers?
# 3. Modify the program to track and report this statistic

# Hint: To calculate stranger encounters, check if the other
# player's name is NOT in self.memory before the encounter`,
      solution: `# Experiment with Fewer Encounters - SOLUTION

# Modified doGeneration to track statistics
def doGeneration(population, numberOfEncounters):
    strangerCount = 0
    totalEncounters = 0
    
    for encounterNumber in range(numberOfEncounters):
        players = random.sample(population, 2)
        player1, player2 = players[0], players[1]
        
        # Check if this is a stranger encounter
        if player2.name not in player1.memory:
            strangerCount += 1
        
        encounter(player1, player2)
        totalEncounters += 1
    
    strangerPercent = (strangerCount / totalEncounters) * 100
    print(f"Stranger encounters: {strangerCount}/{totalEncounters} ({strangerPercent:.1f}%)")

# Run simulation
print("Reduced Encounters Experiment")
print("=" * 50)

specs = [[FriendlyPlayer, 9], [MeanPlayer, 9]]
population = makePopulation(specs)

for generation in range(5):
    print(f"\\n=== Generation {generation + 1} ===")
    doGeneration(population, 500)  # Reduced from 2,000
    scoreList = sortPopulation(population)
    report(scoreList)
    
    if generation < 4:
        population = makeNextGeneration(scoreList)

print("\\n" + "=" * 50)
print("Analysis:")
print("With fewer encounters:")
print("- Higher percentage of stranger encounters")
print("- Less opportunity for reputation to matter")
print("- Results may vary more between runs")
print("- Mean players may persist longer initially")
print("")
print("With 18 players and 500 encounters, on average:")
print("- Each player has about 55-60 encounters")
print("- With 17 possible opponents, many are repeat encounters")
print("- Roughly 40-50% are stranger encounters")`
    },
    {
      id: '3',
      title: "Neighbor-Only Encounters",
      description: "Modify the simulation so individuals encounter only nearby neighbors (within 3 positions) rather than random players. How does locality affect evolution?",
      difficulty: "advanced",
      starter: `# Neighbor-Only Encounters

# Modify doGeneration to restrict encounters to nearby players

def doGenerationLocal(population, numberOfEncounters):
    """
    Run encounters only between neighboring players.
    
    Player at index i can only encounter players at indices
    i-3, i-2, i-1, i+1, i+2, i+3 (wrapping around at edges).
    """
    # TODO: Implement local encounters
    # Hint: Use random.choice to pick a neighbor from valid range
    # Remember to handle edge cases (wrap around)
    pass

# Test with same population as Question 0
specs = [[FriendlyPlayer, 9], [MeanPlayer, 9]]
population = makePopulation(specs)

for generation in range(5):
    print(f"\\n=== Generation {generation + 1} ===")
    doGenerationLocal(population, 2000)  # Use local version
    # ... rest of simulation`,
      solution: `# Neighbor-Only Encounters - SOLUTION

def doGenerationLocal(population, numberOfEncounters):
    """
    Run encounters only between neighboring players.
    """
    popSize = len(population)
    
    for encounterNumber in range(numberOfEncounters):
        # Pick a random player
        index = random.randint(0, popSize - 1)
        player1 = population[index]
        
        # Find valid neighbor indices (within 3 positions)
        neighborIndices = []
        for offset in range(-3, 4):
            if offset != 0:  # Don't include self
                neighborIndex = (index + offset) % popSize
                neighborIndices.append(neighborIndex)
        
        # Pick a random neighbor
        neighborIndex = random.choice(neighborIndices)
        player2 = population[neighborIndex]
        
        encounter(player1, player2)

# Full simulation with local encounters
print("Local Encounters Simulation")
print("=" * 50)
print("Players only encounter neighbors (within 3 positions)")
print("")

specs = [[FriendlyPlayer, 9], [MeanPlayer, 9]]
population = makePopulation(specs)

for generation in range(5):
    print(f"\\n=== Generation {generation + 1} ===")
    doGenerationLocal(population, 2000)
    scoreList = sortPopulation(population)
    report(scoreList)
    
    if generation < 4:
        population = makeNextGeneration(scoreList)

print("\\n" + "=" * 50)
print("Analysis:")
print("With local encounters:")
print("- Players develop stronger relationships with neighbors")
print("- Clustering of similar types may emerge")
print("- Results depend more on initial spatial arrangement")
print("- Cooperative regions may form and persist")
print("- Evolution may be slower or follow different paths")`
    },
    {
      id: '4',
      title: "Bank Simulation with Probabilistic Service",
      description: "Create a bank simulation where customers arrive randomly (20/hour average) and each needs 1-5 minutes of service time. Calculate average line length over an 8-hour day.",
      difficulty: "intermediate",
      starter: `# Bank Line Simulation

import random

def chance(p):
    """Return True with probability p (0 to 1)."""
    return random.random() < p

# Bank parameters
HOURS_OPEN = 8
MINUTES_PER_HOUR = 60
CUSTOMERS_PER_HOUR = 20

# TODO: Calculate probability of customer arrival each minute
# Hint: 20 customers per 60 minutes = ? probability per minute

# TODO: Implement simulation
# Track:
# - Current line length
# - Total line length (for averaging)
# - Customer being served and time remaining

# Each minute:
# 1. Check if new customer arrives (use chance function)
# 2. Serve current customer (decrement service time)
# 3. If service complete and line has people, serve next
# 4. Track statistics

# Print average line length at end`,
      solution: `# Bank Line Simulation - SOLUTION

import random

def chance(p):
    """Return True with probability p (0 to 1)."""
    return random.random() < p

# Bank parameters
HOURS_OPEN = 8
MINUTES_PER_HOUR = 60
TOTAL_MINUTES = HOURS_OPEN * MINUTES_PER_HOUR
CUSTOMERS_PER_HOUR = 20

# Probability of customer arriving each minute
ARRIVAL_PROB = CUSTOMERS_PER_HOUR / MINUTES_PER_HOUR

# Simulation state
line = 0  # Number of customers waiting
serviceTimeRemaining = 0  # Minutes left for current customer
totalLineLength = 0  # Sum of line lengths (for averaging)
customersServed = 0

print("Bank Simulation")
print("=" * 50)
print(f"Hours open: {HOURS_OPEN}")
print(f"Average customers/hour: {CUSTOMERS_PER_HOUR}")
print(f"Arrival probability/minute: {ARRIVAL_PROB:.3f}")
print("")

# Run simulation
for minute in range(TOTAL_MINUTES):
    # Check if new customer arrives
    if chance(ARRIVAL_PROB):
        line += 1
    
    # Serve current customer if any
    if serviceTimeRemaining > 0:
        serviceTimeRemaining -= 1
        
        # If service complete and people waiting, serve next
        if serviceTimeRemaining == 0 and line > 0:
            line -= 1
            # Random service time: 1-5 minutes
            serviceTimeRemaining = random.randint(1, 5)
            customersServed += 1
    else:
        # No one being served - check if someone waiting
        if line > 0:
            line -= 1
            serviceTimeRemaining = random.randint(1, 5)
            customersServed += 1
    
    # Track statistics
    totalLineLength += line

# Calculate and report results
averageLineLength = totalLineLength / TOTAL_MINUTES

print("Results:")
print("-" * 50)
print(f"Total customers served: {customersServed}")
print(f"Customers still waiting: {line}")
print(f"Average line length: {averageLineLength:.2f} customers")
print("")

if averageLineLength < 2:
    print("✓ Good service - short wait times")
elif averageLineLength < 5:
    print("⚠ Moderate service - acceptable wait times")
else:
    print("✗ Poor service - long wait times")

# Now test with 25 customers/hour
print("\\n" + "=" * 50)
print("Rerunning with 25 customers/hour...")
print("")

# Reset and rerun with higher load
# [Same simulation code with CUSTOMERS_PER_HOUR = 25]`
    }
  ];

  return (
    <UnitTemplate
      unitTitle="Unit 10"
      unitSubtitle="Evolutionary Simulations and Game Theory"
      overview={overview}
      lessons={lessons}
      exercises={exercises}
    />
  );
};

export default Unit10;