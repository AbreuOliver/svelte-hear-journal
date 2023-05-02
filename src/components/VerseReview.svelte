<!-- <script>
  import { flip } from "svelte/animate";

  let words = [
    { value: "For", correct: false },
    { value: "God", correct: false },
    { value: "so", correct: false },
    { value: "loved", correct: false },
    { value: "the", correct: false },
    { value: "world", correct: false },
    { value: "that", correct: false },
    { value: "He", correct: false },
    { value: "gave", correct: false },
    { value: "His", correct: false },
    { value: "only", correct: false },
    { value: "begotten", correct: false },
    { value: "Son", correct: false },
  ];
  let hoveringOverWord;

  function dragStart(event, wordIndex) {
    const data = { wordIndex };
    event.dataTransfer.setData("text/plain", JSON.stringify(data));
  }

  function drop(event, targetIndex) {
    event.preventDefault();
    const json = event.dataTransfer.getData("text/plain");
    const data = JSON.parse(json);
    const { wordIndex } = data;
    const word = words[wordIndex];
    words.splice(wordIndex, 1);
    words.splice(targetIndex, 0, word);
    if (isInOrder(words)) {
      highlightCorrectWords();
    } else {
      clearHighlights();
    }
  }

  function isInOrder(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i].value > arr[i + 1].value) {
        return false;
      }
    }
    return true;
  }

  function highlightCorrectWords() {
    for (let i = 0; i < words.length; i++) {
      words[i].correct = true;
    }
  }

  function clearHighlights() {
    for (let i = 0; i < words.length; i++) {
      words[i].correct = false;
    }
  }
</script>

<p>Drag words to reorder them:</p>

{#each words as word, index (word.value)}
  <div animate:flip>
    <div
      class="word {word.correct ? 'correct' : ''}"
      draggable={true}
      on:dragstart={(event) => dragStart(event, index)}
      on:dragover={() => false}
      on:drop={() => drop(event, index)}
    >
      {word.value}
    </div>
  </div>
{/each}

<style>
  .word {
    display: inline-block;
    background-color: lightgray;
    cursor: pointer;
    margin-right: 10px;
    padding: 10px;
  }

  .correct {
    background-color: lightgreen;
  }
</style> -->
<script>
  //   import { onMount } from "svelte";
  import { Button } from "flowbite-svelte";
  let text =
    "Blessed are the poor in spirit: for theirs is the kingdom of heaven.";
  let percentWordsToReplace = 0.25;
  let modifiedText = "";

  //   const replaceWordsWithHyphens = () => {
  //     const words = text.split(" ");
  //     const numWordsToReplace = Math.ceil(words.length * percentWordsToReplace);

  //     const indicesToReplace = [];
  //     const conjunctions = ["and", "or", "but", "nor", "to"];
  //     const articles = ["a", "an", "the"];

  //     for (let i = 0; i < words.length; i++) {
  //       if (
  //         !conjunctions.includes(words[i].toLowerCase()) &&
  //         !articles.includes(words[i].toLowerCase())
  //       ) {
  //         indicesToReplace.push(i);
  //       }
  //     }

  //     const indicesToReplaceRandom = [];
  //     while (
  //       indicesToReplaceRandom.length < numWordsToReplace &&
  //       indicesToReplace.length > 0
  //     ) {
  //       const randomIndex = Math.floor(Math.random() * indicesToReplace.length);
  //       indicesToReplaceRandom.push(indicesToReplace[randomIndex]);
  //       indicesToReplace.splice(randomIndex, 1);
  //     }

  //     for (let i = 0; i < indicesToReplaceRandom.length; i++) {
  //       const index = indicesToReplaceRandom[i];
  //       const word = words[index];
  //       const hyphenatedWord = word.replace(/[a-zA-Z]/g, "-");
  //       words[index] = hyphenatedWord;
  //     }

  //     modifiedText = words.join(" ");
  //   };

  //   //   onMount(() => {
  //   //     replaceWordsWithHyphens;
  //   //   });

  //   $: {
  //     replaceWordsWithHyphens();
  //   }
  const replaceWordsWithHyphens = () => {
    const words = text.split(" ");
    const numWordsToReplace = Math.ceil(words.length * percentWordsToReplace);

    const indicesToReplace = [];
    const conjunctions = ["and", "or", "but", "nor", "to"];
    const articles = ["a", "an", "the"];

    for (let i = 0; i < words.length; i++) {
      if (
        !conjunctions.includes(words[i].toLowerCase()) &&
        !articles.includes(words[i].toLowerCase())
      ) {
        indicesToReplace.push(i);
      }
    }

    const indicesToReplaceRandom = [];
    while (
      indicesToReplaceRandom.length < numWordsToReplace &&
      indicesToReplace.length > 0
    ) {
      const randomIndex = Math.floor(Math.random() * indicesToReplace.length);
      indicesToReplaceRandom.push(indicesToReplace[randomIndex]);
      indicesToReplace.splice(randomIndex, 1);
    }

    for (let i = 0; i < indicesToReplaceRandom.length; i++) {
      const index = indicesToReplaceRandom[i];
      const word = words[index];
      const hyphenatedWord = "-".repeat(word.replace(/[a-zA-Z]/g, "-").length); // Count non-letter characters in the word and replace with a single dash
      words[index] = hyphenatedWord;
    }

    modifiedText = words.join(" ");
  };
</script>

<main>
  <h1>Text Modifier</h1>

  <div>
    <label for="percentWordsToReplace">Percentage of Words to Replace:</label>
    <select bind:value={percentWordsToReplace} id="percentWordsToReplace">
      <option value="0.1">10%</option>
      <option value="0.25">25%</option>
      <option value="0.5">50%</option>
      <option value="0.75">75%</option>
    </select>
  </div>

  <div>
    <h2>Original Text:</h2>
    <p>{text}</p>
  </div>
  <Button on:click={replaceWordsWithHyphens}>Generate Modified Text</Button>
  <div>
    <h2>Modified Text:</h2>
    <p>{modifiedText}</p>
  </div>
</main>

<style>
  main {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }

  select {
    margin-top: 10px;
  }

  h2 {
    margin-top: 20px;
  }

  p {
    white-space: pre-wrap;
  }
</style>
