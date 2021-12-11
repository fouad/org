import { Fragment, useMemo } from 'react'
import { Ingredient, Recipe } from 'cooklang'
import { useFormik } from 'formik'
import { usePersist } from 'react-easy-persist'

async function loadFormPersist() {
  const useFormikPersist = await import('./utils/use-formik-persist').then(
    (module) => module.useFormikPersist
  )

  return useFormikPersist
}

export const RecipeCard = ({ recipe = '', children = '' }) => {
  const result = useMemo(
    () => new Recipe(recipe || children),
    [recipe, children]
  )

  // const [useFormikPersist, setHook] = useState(
  //   () => (_formik: any, _opts: UseFormikPersistOptions) => {
  //     return [() => {}]
  //   }
  // )

  // useEffect(() => {
  //   loadFormPersist().then((hook) => setHook(hook))
  // })

  const form = useFormik({
    onSubmit: () => {},
    initialValues: {
      showAllIngredients: false,
      ingredients: result.ingredients.reduce(
        (acc, i) => ({ ...acc, [toId(i)]: false }),
        {}
      ) as Record<string, boolean>,
      steps: result.steps.reduce(
        (acc, _, i) => ({ ...acc, [i]: false }),
        {}
      ) as Record<number, boolean>,
    },
  })
  const [clear, inited] = usePersist({
    name: result.metadata[0].value,
    getValues: () => form.values,
    update: form.setValues,
    encode: JSON.stringify,
    decode: JSON.parse,
  })
  // const [clear] = useFormikPersist(form, {
  //   namespace: result.metadata[0].value,
  // })

  return (
    <div>
      <div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Ingredient</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {result.ingredients
              ?.filter((_, key) => {
                if (form.values.showAllIngredients) {
                  return true
                }
                if (result.ingredients.length > 6) {
                  return key < 6
                }
                return false
              })
              .map((ingredient, key) => (
                <tr id={toId(ingredient)} key={key}>
                  <td className="w-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4 cursor-pointer align-middle -mt-1"
                      onChange={form.handleChange}
                      name={`ingredients.${toId(ingredient)}`}
                      checked={form.values.ingredients[toId(ingredient)]}
                    />
                  </td>
                  <td
                    className={
                      'cursor-pointer ' +
                      (form.values.ingredients[toId(ingredient)]
                        ? 'line-through'
                        : '')
                    }
                    onClick={() => {
                      form.setFieldValue(
                        `ingredients.${toId(ingredient)}`,
                        !form.values.ingredients[toId(ingredient)]
                      )
                    }}
                  >
                    {toTitleCase(ingredient.name)}
                  </td>
                  <td>
                    <IngredientAmount ingredient={ingredient} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="-mt-4 mb-4 ml-8">
          <button
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-gray-700 bg-gray-200 hover:bg-gray-300 hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            onClick={() => {
              form.setFieldValue(
                'showAllIngredients',
                !form.values.showAllIngredients
              )
            }}
          >
            Show {form.values.showAllIngredients ? 'less' : 'more'}
          </button>
          <button
            className="ml-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-purple-700 bg-purple-100 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            onClick={() => {
              form.resetForm()
              clear()
            }}
          >
            Start over
          </button>
          {/* <button
            className="ml-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            disabled
            title="Coming soon! Waiting on Instacart API..."
          >
            Add to Instacart
          </button> */}
        </div>
      </div>
      <div className="my-8">
        <strong>Steps</strong>
        <ol>
          {result.steps?.map((step, key) => (
            <li key={key} className="relative">
              <input
                type="checkbox"
                name={`steps.${key}`}
                onChange={form.handleChange}
                checked={form.values.steps[key]}
                className="w-4 h-4 cursor-pointer absolute left-0 top-8"
              />
              <span className={form.values.steps[key] ? 'line-through' : ''}>
                {step.line?.map((token, _key) => (
                  <Fragment key={_key}>
                    {typeof token === 'string' && token}
                    {typeof token !== 'string' && (
                      <a href={`#${toId(token as Ingredient)}`}>
                        <span
                          className={
                            form.values.steps[key]
                              ? 'text-gray-600 hover:text-blue-500 font-normal hover:no-underline'
                              : 'text-gray-600 border-b border-gray-400 border-dashed'
                          }
                        >
                          {(token as Ingredient).name}
                        </span>
                        {!form.values.steps[key] && (
                          <span className="no-underline text-xs -mt-0.5 ml-2 mr-1 px-1 py-0.5 bg-blue-500 text-white rounded">
                            <IngredientAmount ingredient={token} />
                          </span>
                        )}
                      </a>
                    )}
                  </Fragment>
                ))}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

function toId(ingredient: Ingredient) {
  const { name } = ingredient
  return (
    name.split('').reduce((acc: string, char: string) => {
      if (char === ' ') return acc + '-'
      if (char === ',' || char === '&' || char === '.') return acc
      return acc + char.toLowerCase()
    }, '') +
    '-' +
    ingredient.amount.replace('.', '')
  )
}

function toTitleCase(str: string) {
  return str.replace('.', '').replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
  })
}

function IngredientAmount(props: { ingredient: Ingredient }) {
  return <>{props.ingredient.amount}</>
}
