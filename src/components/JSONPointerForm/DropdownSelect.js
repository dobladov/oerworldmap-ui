/* global document */
import React from 'react'
import PropTypes from 'prop-types'

import withFormData from './withFormData'
import { triggerClick } from '../../common'

class DropdownSelect extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      filter: "",
      dropdown: false,
      labels: props.options.reduce((acc, curr) => {
        return Object.assign(acc, {[curr]: props.translate(curr).toLowerCase()})
      }, {})
    }
    this.optionFilter = this.optionFilter.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClick)
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick)
  }

  handleClick(e) {
    if (!this.wrapper.contains(e.target)) {
      this.setState({dropdown:false})
    }
  }

  optionFilter() {
    return option => !this.state.filter
      || option.toLowerCase().search(this.state.filter.trim().toLowerCase()) !== -1
      || this.state.labels[option].search(this.state.filter.trim().toLowerCase()) !== -1
  }

  render() {
    const {
      name, property, value, options, setValue, errors, title, translate, className, formId,
      required
    } = this.props

    return (
      <div
        ref={el => this.wrapper = el}
        className={`DropdownSelect ${property || ''} ${className} ${errors.length ? 'hasError': ''}`.trim()}
        aria-labelledby={`${formId}-${name}-label`}
      >
        <div className={`label ${required ? 'required' : ''}`.trim()} id={`${formId}-${name}-label`}>
          {translate(title)}
        </div>
        {value ? (
          <div
            className="selectedContainer"
          >
            <input
              type="checkbox"
              name={name}
              value={value}
              id={`${formId}-${name}-${value}`}
              checked
              onChange={e => setValue(e.target.checked ? e.target.value : undefined)}
            />
            <label
              htmlFor={`${formId}-${name}-${value}`}
              tabIndex="0"
              role="button"
              onKeyDown={e => triggerClick(e, 13)}
            >
              {translate(value)}
            </label>
          </div>
        ) : (
          <div
            className="dropdownContainer"
            onKeyDown={(e) => {
              if (e.keyCode === 27) {
                this.setState({dropdown: false})
              }
            }}
            role="presentation"
          >
            <button
              className={`toggleDropdown ${errors.length ? 'error' : ''}`.trim()}
              onClick={e => {
                e.preventDefault()
                this.setState({dropdown: !this.state.dropdown})
              }}
            >
              {!errors.length
                ? translate('select', {name: translate(title)})
                : errors.map(error => error.message).join(', ')
              }
            </button>
            <div className={this.state.dropdown ? 'dropdownList' : 'hidden'}>
              <div className="filterContainer">
                <input
                  type="text"
                  className="filter"
                  placeholder="..."
                  onChange={e => this.setState({filter: e.target.value})}
                  value={this.state.filter}
                  ref={el => this.state.dropdown && el && el.focus()}
                />
              </div>
              <ul className="optionsContainer">
                {options.filter(this.optionFilter()).map(option => (
                  <li key={option}>
                    <input
                      type="checkbox"
                      name={name}
                      value={option}
                      id={`${formId}-${name}-${option}`}
                      checked={value === option}
                      onChange={e => {
                        setValue(e.target.checked ? e.target.value : undefined)
                        this.setState({filter: "", dropdown: false})
                      }}
                    />
                    <label
                      htmlFor={`${formId}-${name}-${option}`}
                      tabIndex="0"
                      role="button"
                      onKeyDown={e => triggerClick(e, 13)}
                    >
                      {translate(option)}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    )
  }

}

DropdownSelect.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  property: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  setValue: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  translate: PropTypes.func.isRequired,
  className: PropTypes.string,
  formId: PropTypes.string.isRequired,
  required: PropTypes.bool
}

DropdownSelect.defaultProps = {
  value: '',
  property: undefined,
  errors: [],
  title: '',
  className: '',
  required: false
}

export default withFormData(DropdownSelect)
