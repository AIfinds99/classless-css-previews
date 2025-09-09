export const examples = {
  "kitchen-sink": `<nav>
    <ul>
        <li><strong>Hello World</strong></li>
    </ul>
    <ul>
        <li><a href="#">Page 1</a></li>
        <li><a href="#">Page 2</a></li>
        <li><a href="#">Page 3</a></li>
    </ul>
</nav>
<br>
<h1>Hello World</h1>
<hr>
<blockquote>
    "Design is a funny word. Some people think design means how it looks. But of course, if you dig deeper, it's really how it works."
    <footer>
        <cite>— Steve Jobs</cite>
    </footer>
</blockquote>
<hr>
<button>Hello World</button>
<hr>
<a href="#">Hello World</a>
<hr>
<form>
    <label>
    First name
    <input
      name="first_name"
      placeholder="First name"
      autocomplete="given-name"
    />
  </label>
    <br>
    <fieldset>
        <legend>Language preferences:</legend>
        <input type="checkbox" id="hindi" name="hindi" checked />
        <label htmlFor="hindi">Hindi</label>
        <input type="checkbox" id="swahili" name="swahili" />
        <label htmlFor="swahili">Swahili</label>
        <input type="checkbox" id="navi" name="navi" disabled />
        <label htmlFor="navi" aria-disabled="true">Na'vi</label>
    </fieldset>
    <br>
    <label>
  Brightness
  <input type="range" />
</label>
    <br>
    <label>
    <input name="terms" type="checkbox" role="switch" />
    I agree to the Terms
  </label>
    <br>
    <br>
    <input type="submit" value="Submit">
</form>
<hr>
<table>
    <thead>
        <tr>
            <th scope="col">Planet</th>
            <th scope="col">Diameter (km)</th>
            <th scope="col">Distance to Sun (AU)</th>
            <th scope="col">Orbit (days)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">Mercury</th>
            <td>4,880</td>
            <td>0.39</td>
            <td>88</td>
        </tr>
        <tr>
            <th scope="row">Venus</th>
            <td>12,104</td>
            <td>0.72</td>
            <td>225</td>
        </tr>
        <tr>
            <th scope="row">Earth</th>
            <td>12,742</td>
            <td>1.00</td>
            <td>365</td>
        </tr>
        <tr>
            <th scope="row">Mars</th>
            <td>6,779</td>
            <td>1.52</td>
            <td>687</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <th scope="row">Average</th>
            <td>9,126</td>
            <td>0.91</td>
            <td>341</td>
        </tr>
    </tfoot>
</table>
<hr>
<details name="example">
    <summary>Accordion 1</summary>
    <p>...</p>
</details>
<details name="example">
    <summary>Accordion 2</summary>
    <ul>
        <li>...</li>
        <li>...</li>
    </ul>
</details>
<hr />
<article>
    <header>Article Header</header>
    Article Body
    <footer>Article Footer</footer>
</article>
<hr />
<progress />
<hr />`,

  "nav": `<nav>
    <ul>
        <li><strong>Hello World</strong></li>
    </ul>
    <ul>
        <li><a href="#">Page 1</a></li>
        <li><a href="#">Page 2</a></li>
        <li><a href="#">Page 3</a></li>
    </ul>
</nav>`,

  "h1": `<h1>Hello World</h1>`,

  "hr": `<hr>`,

  "blockquote": `<blockquote>
    "Design is a funny word. Some people think design means how it looks. But of course, if you dig deeper, it's really how it works."
    <footer>
        <cite>— Steve Jobs</cite>
    </footer>
</blockquote>`,

  "button": `<button>Hello World</button>`,

  "link": `<a href="#">Hello World</a>`,

  "form": `<form>
    <label>
    First name
    <input
      name="first_name"
      placeholder="First name"
      autocomplete="given-name"
    />
  </label>
    <br>
    <fieldset>
        <legend>Language preferences:</legend>
        <input type="checkbox" id="hindi" name="hindi" checked />
        <label htmlFor="hindi">Hindi</label>
        <input type="checkbox" id="swahili" name="swahili" />
        <label htmlFor="swahili">Swahili</label>
        <input type="checkbox" id="navi" name="navi" disabled />
        <label htmlFor="navi" aria-disabled="true">Na'vi</label>
    </fieldset>
    <br>
    <label>
  Brightness
  <input type="range" />
</label>
    <br>
    <label>
    <input name="terms" type="checkbox" role="switch" />
    I agree to the Terms
  </label>
    <br>
    <br>
    <input type="submit" value="Submit">
</form>`,

  "table": `<table>
    <thead>
        <tr>
            <th scope="col">Planet</th>
            <th scope="col">Diameter (km)</th>
            <th scope="col">Distance to Sun (AU)</th>
            <th scope="col">Orbit (days)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">Mercury</th>
            <td>4,880</td>
            <td>0.39</td>
            <td>88</td>
        </tr>
        <tr>
            <th scope="row">Venus</th>
            <td>12,104</td>
            <td>0.72</td>
            <td>225</td>
        </tr>
        <tr>
            <th scope="row">Earth</th>
            <td>12,742</td>
            <td>1.00</td>
            <td>365</td>
        </tr>
        <tr>
            <th scope="row">Mars</th>
            <td>6,779</td>
            <td>1.52</td>
            <td>687</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <th scope="row">Average</th>
            <td>9,126</td>
            <td>0.91</td>
            <td>341</td>
        </tr>
    </tfoot>
</table>`,

  "details": `<details name="example">
    <summary>Accordion 1</summary>
    <p>...</p>
</details>
<details name="example">
    <summary>Accordion 2</summary>
    <ul>
        <li>...</li>
        <li>...</li>
    </ul>
</details>`,

  "article": `<article>
    <header>Article Header</header>
    Article Body
    <footer>Article Footer</footer>
</article>`,

  "progress": `<progress />`,

  "input": `<label>
    First name
    <input
      name="first_name"
      placeholder="First name"
      autocomplete="given-name"
    />
  </label>`,

  "checkbox": `<fieldset>
    <legend>Language preferences:</legend>
    <input type="checkbox" id="hindi" name="hindi" checked />
    <label htmlFor="hindi">Hindi</label>
    <input type="checkbox" id="swahili" name="swahili" />
    <label htmlFor="swahili">Swahili</label>
    <input type="checkbox" id="navi" name="navi" disabled />
    <label htmlFor="navi" aria-disabled="true">Na'vi</label>
</fieldset>`,

  "range": `<label>
  Brightness
  <input type="range" />
</label>`,

  "switch": `<label>
    <input name="terms" type="checkbox" role="switch" />
    I agree to the Terms
  </label>`,
};
